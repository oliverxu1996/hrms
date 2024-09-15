const _ = require('lodash');
const { Sequelize } = require('sequelize');

const validationUtils = require('../../utils/validation-utils');
const paginationUtils = require('../../utils/pagination-utils');
const keyUtils = require('../../utils/key-utils');

const menuService = require('./menu-service');

const Role = require('../model/role-model');

/**
 * 角色服务
 * 
 * @author xuke
 * @date 2024/9/15
 */
const roleService = {

    /**
     * 保存角色
     */
    saveRole: async function(role) {
        // 参数校验
        if (_.isEmpty(role) || !_.isObject(role)) {
            throw new Error('角色为空，无法进行保存');
        }

        this.doParamValidation(role);

        // 角色名称重复性校验
        if (!_.isEmpty(await this.queryByCondition({ roleName: role.roleName }))) {
            throw new Error('角色名称已存在，无法进行保存');
        }

        // 权限菜单存在性校验
        if (!_.isEmpty(role.menuIds) && _.isArray(role.menuIds)) {
            const sourceMenus = menuService.queryByCondition({ id_in: _.join(role.menuIds, ',') });
            if (_.isEmpty(sourceMenus)) {
                throw new Error('权限菜单不存在，无法进行保存');
            }

            if (role.menuIds.length !== sourceMenus.length) {
                throw new Error('部分权限菜单不存在，无法进行保存');
            }
        }

        // 自定义数据权限组织校验
        if (role.dataScope === '2') {
            // TODO: ...
        }

        // 初始化参数
        role.id = keyUtils.generateUuid();
        
        // 进行保存
        await Role.create(role);
    },

    /**
     * 修改角色
     */
    modifyRole: async function(role) {
        // 参数校验
        if (_.isEmpty(role) || !_.isObject(role)) {
            throw new Error('角色为空，无法进行修改');
        }

        validationUtils.checkBlank(role.id, '未指定角色ID，无法进行修改');
        this.doParamValidation(role);

        // 角色存在性校验
        const sourceRole = await this.queryById(role.id);
        if (_.isEmpty(sourceRole)) {
            throw new Error('角色不存在，无法进行修改');
        }

        // 权限菜单存在性校验
        if (!_.isEmpty(role.menuIds) && _.isArray(role.menuIds)) {
            const sourceMenus = menuService.queryByCondition({ id_in: _.join(role.menuIds, ',') });
            if (_.isEmpty(sourceMenus)) {
                throw new Error('权限菜单不存在，无法进行修改');
            }

            if (role.menuIds.length !== sourceMenus.length) {
                throw new Error('部分权限菜单不存在，无法进行修改');
            }
        }

        // 自定义数据权限组织校验
        if (role.dataScope === '2') {
            // TODO: ...
        }

        // 进行修改
        await Role.update(role, {
            where: {
                id: role.id
            }
        });
    },

    /**
     * 删除角色
     */
    removeRole: async function(id) {
        // 参数校验
        validationUtils.checkBlank(id, '未指定角色ID，无法进行删除');

        // 存在性校验
        const sourceRole = await this.queryById(id);
        if (_.isEmpty(sourceRole)) {
            throw new Error('角色不存在，无法进行删除');
        }

        // 进行删除
        await Role.destroy({
            where: {
                id: sourceRole.id
            }
        });
    },

    /**
     * 条件查询角色 
     */
    queryByCondition: async function(condition) {
        // 参数校验
        if (_.isEmpty(condition)) {
            throw new Error('未指定条件，无法进行查询')
        }

        // 组装查询条件
        const query = {
            where: {}
        };

        if (!_.isEmpty(condition.roleName)) {
            if (condition.roleName.startsWith('%') || condition.roleName.endsWith('%')) {
                query.where.roleName = {
                    [Sequelize.Op.like]: condition.roleName
                };
            } else {
                query.where.roleName = condition.roleName;
            }
        }

        if (!_.isEmpty(condition.status)) {
            query.where.status = condition.status;
        }

        // 处理排序条件
        if (!_.isEmpty(condition.sortBy) && !_.isEmpty(condition.order)) {
            validationUtils.checkRange(condition.order, ['ASC', 'DESC'], '排序条件格式非法');
            query.order = [
                [condition.sortBy, condition.order]
            ];
        }

        // 分页查询
        const pagination = paginationUtils.parseCondition(condition);
        if (!_.isEmpty(pagination)) {
            query.limit = pagination.limit;
            query.offset = pagination.offset;

            const result = await Role.findAndCountAll(query);
            return {
                total: result.count,
                rows: result.rows
            };
        }

        // 普通查询
        return await Role.findAll(query);
    },

    /**
     * ID查询角色 
     */
    queryById: async function(id) {
        // 参数校验
        validationUtils.checkBlank(id, '未指定ID，无法查询角色');

        // 查询角色
        return await Role.findByPk(id);
    },

    /**
     * 参数校验
     */
    doParamValidation: function(role) {
        validationUtils.checkBlank(role.roleName, '角色名称不能为空');

        if (!_.isEmpty(role.menuIds) && _.isArray(role.menuIds)) {
            throw new Error('权限菜单ID清单格式非法');
        }

        validationUtils.checkBlank(role.dataScope, '数据权限不能为空');
        validationUtils.checkRange(role.dataScope, ['1', '2', '3', '4', '5'], '数据权限格式非法');
        if (role.dataScope === '2') {
            if (_.isEmpty(role.deptIds) || !_.isArray(role.deptIds)) {
                throw new Error('组织ID清单格式非法');
            }
        }

        validationUtils.checkBlank(role.status, '状态不能为空');
        validationUtils.checkRange(role.status, ['0', '1'], '状态格式非法');
    }
};

module.exports = roleService;