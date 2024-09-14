const _ = require('lodash');
const { Sequelize } = require('sequelize');

const validationUtils = require('../../utils/validation-utils');
const paginationUtils = require('../../utils/pagination-utils');
const keyUtils = require('../../utils/key-utils');

const TenantPackage = require('../model/tenant-package-model');

/**
 * 租户套餐服务
 * 
 * @author xuke
 * @date 2024/9/13
 */
const tenantPackageService = {

    /**
     * 保存租户套餐
     */
    savePackage: async function(package) {
        // 参数校验
        if (_.isEmpty(package) || !_.isObject(package)) {
            throw new Error('租户套餐为空，无法进行保存')
        }

        this.doParamValidation(package);

        // 套餐名称重复性校验
        if (!_.isEmpty(await this.queryByCondition(package.packageName))) {
            throw new Error('套餐名称已存在，无法进行保存');
        }

        // 初始化参数
        package.id = keyUtils.generateUuid();

        // 进行保存
        await TenantPackage.create(package);
    },

    /**
     * 修改租户套餐
     */
    modifyPackage: async function(package) {
        // 参数校验
        if (_.isEmpty(package) || !_.isObject(package)) {
            throw new Error('租户套餐为空，无法进行保存');
        }

        validationUtils.checkBlank(package.id, '未指定套餐ID，无法进行修改');
        this.doParamValidation(package);

        // 存在性校验
        const sourcePackage = await this.queryById(package.id);
        if (_.isEmpty(sourcePackage)) {
            throw new Error('租户套餐不存在，无法进行修改');
        }

        // 套餐名称校验
        if (sourcePackage.packageName !== package.packageName) {
            throw new Error('套餐名称不允许进行修改');
        }

        // 进行修改
        await TenantPackage.update(package, {
            where: {
                id: package.id
            }
        });
    },

    /**
     * 删除租户套餐
     */
    removePackage: async function(id) {
        // 参数校验
        validationUtils.checkBlank(id, '未指定租户套餐ID，无法进行删除');

        // 存在性校验
        const sourcePackage = await this.queryById(id);
        if (_.isEmpty(sourcePackage)) {
            throw new Error('租户套餐不存在，无法进行删除');
        }

        // 进行删除
        await TenantPackage.destroy({
            where: {
                id: sourcePackage.id
            }
        });
    },

    /**
     * 条件查询租户套餐
     */
    queryByCondition: async function(condition) {
        // 参数校验
        if (_.isEmpty(condition) || !_.isObject(condition)) {
            throw new Error('未指定条件，无法进行查询');
        }

        // 组装条件
        const query = {
            where: {}
        };

        if (!_.isEmpty(condition.packageName)) {
            if (condition.packageName.startsWith('%') || condition.packageName.endsWith('%')) {
                query.where.packageName = {
                    [Sequelize.Op.like]: condition.packageName
                };
            } else {
                query.where.packageName = condition.packageName;
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

            const result = await TenantPackage.findAndCountAll(query);
            return {
                total: result.count,
                rows: result.rows
            };
        }

        // 普通查询
        return await TenantPackage.findAll(query);
    },

    /**
     * ID查询租户套餐
     */
    queryById: async function(id) {
        // 参数校验
        validationUtils.checkBlank(id, '未指定ID，无法查询租户套餐');

        // 查询租户套餐
        return await TenantPackage.findByPk(id);
    },

    /**
     * 参数校验
     */
    doParamValidation: function(package) {
        validationUtils.checkBlank(package.packageName, '套餐名称不能为空');
        
        validationUtils.checkBlank(tenant.status, '状态不能为空');
        validationUtils.checkRange(tenant.status, ['0', '1'], '状态格式非法');
    }
};

module.exports = tenantPackageService;