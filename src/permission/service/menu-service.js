const _ = require('lodash');
const { Sequelize } = require('sequelize');

const validationUtils = require('../../utils/validation-utils');
const treeUtils = require('../../utils/tree-utils');
const keyUtils = require('../../utils/key-utils');

const Menu = require('../model/menu-model');

/**
 * 菜单服务
 * 
 * @author xuke
 * @date 2024/9/15
 */
const menuService = {

    /**
     * 保存菜单
     */
    saveMenu: async function(menu) {
        // 参数校验
        if (_.isEmpty(menu) || !_.isObject(menu)) {
            throw new Error('菜单为空，无法进行保存');
        }

        this.doParamValidation(menu);

        // 父级菜单存在性校验
        if (!_.isEmpty(menu.parentId)) {
            if (_.isEmpty(await this.queryById(menu.parentId))) {
                throw new Error('父级菜单不存在，无法进行保存');
            }
        }

        // 菜单名称重复性校验
        if (!_.isEmpty(await this.queryByCondition({ menuName: menu.menuName }))) {
            throw new Error('菜单名称已存在，无法进行保存');
        }

        // 初始化参数
        menu.id = keyUtils.generateUuid();

        // 进行保存
        await Menu.create(menu);
    },

    /**
     * 修改菜单
     */
    modifyMenu: async function(menu) {
        // 参数校验
        if (_.isEmpty(menu) || !_.isObject(menu)) {
            throw new Error('菜单为空，无法进行修改');
        }

        validationUtils.checkBlank(menu.id, '未指定菜单ID，无法进行修改');
        this.doParamValidation(menu);

        // 父级菜单存在性校验
        if (!_.isEmpty(menu.parentId)) {
            if (_.isEmpty(await this.queryById(menu.parentId))) {
                throw new Error('父级菜单不存在，无法进行保存');
            }
        }

        // 菜单名称重复性校验
        const sourceMenu = await this.queryByCondition({ menuName: menu.menuName });
        if (menu.id !== sourceMenu.id) {
            throw new Error('菜单名称已存在，无法进行修改');
        }

        // 进行修改
        await Menu.update(menu, {
            where: {
                id: menu.id
            }
        });
    },

    /**
     * 删除菜单
     */
    removeMenu: async function(id) {
        // 参数校验
        validationUtils.checkBlank(id, '未指定菜单ID，无法进行删除');

        // 存在性校验
        const sourceMenu = await this.queryById(id);
        if (_.isEmpty(sourceMenu)) {
            throw new Error('菜单不存在，无法进行删除');
        }

        // 进行删除
        await Menu.destroy({
            where: {
                id: sourceMenu.id
            }
        });
    },

    /**
     * 条件查询菜单
     */
    queryByCondition: async function(condition) {
        // 参数校验
        if (_.isEmpty(condition)) {
            throw new Error('未指定条件无法进行查询');
        }

        // 组装查询条件
        const query = {
            where: {}
        };

        if (!_.isEmpty(condition.menuName)) {
            if (condition.menuName.startsWith('%') || condition.menuName.endsWith('%')) {
                condition.where.menuName = {
                    [Sequelize.Op.like]: condition.menuName
                };
            } else {
                query.where.menuName = condition.menuName;
            }
        }

        if (!_.isEmpty(condition.menuType)) {
            validationUtils.checkRange(condition.menuType, ['1', '2', '3'], '菜单类型格式非法');
            query.where.menuType = condition.menuType;
        }

        if (!_.isEmpty(condition.status)) {
            validationUtils.checkRange(condition.status, ['0', '1'], '状态格式非法');
            query.where.status = condition.status;
        }

        // 处理排序条件
        if (!_.isEmpty(condition.sortBy) && !_.isEmpty(condition.order)) {
            validationUtils.checkRange(condition.order, ['ASC', 'DESC'], '排序条件格式非法');
            query.order = [
                [condition.sortBy, condition.order]
            ];
        }

        // 处理权限
        // TODO： ...

        // 进行查询
        let result = await Menu.findAll(query);

        // 处理树形
        if (!_.isEmpty(condition.tree) && _.isBoolean(condition.tree) && condition.tree) {
            result = treeUtils.build(result, 'id', 'parentId');
        }

        return result;
    },

    /**
     * ID查询菜单 
     */
    queryById: async function(id) {
        // 参数校验
        validationUtils.checkBlank(id, '未指定ID，无法查询菜单');

        // 查询菜单
        return await Menu.findByPk(id);
    },

    /**
     * 参数校验
     */
    doParamValidation: function(menu) {
        validationUtils.checkBlank(menu.menuName, '菜单名称不能为空');

        validationUtils.checkBlank(menu.menuType, '菜单类型不能为空');
        validationUtils.checkRange(menu.menuType, ['1', '2', '3'], '菜单类型格式非法');

        if (menu.menuType === '1') {
            validationUtils.checkBlank(menu.path, '路由路径不能为空');
        } else if (menu.menuType === '2') {
            validationUtils.checkBlank(menu.path, '路由路径不能为空');
            validationUtils.checkBlank(menu.component, '组件路径不能为空');
        } else {
            validationUtils.checkBlank(menu.parentId, '父级菜单ID不能为空');
        }
        
        validationUtils.checkBlank(menu.status, '状态不能为空');
        validationUtils.checkRange(menu.status, ['0', '1'], '状态格式非法');
    }
};

module.exports = menuService;