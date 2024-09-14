const _ = require('lodash');
const { Sequelize } = require('sequelize');

const validationUtils = require('../../utils/validation-utils');
const paginationUtils = require('../../utils/pagination-utils');
const keyUtils = require('../../utils/key-utils');

const userService = require('../../user/service/user-service');

const Tenant = require('../model/tenant-model');

/**
 * 租户服务
 * 
 * @author xuke
 * @date 2024/9/9
 */
const tenantService = {

    /**
     * 保存租户
     */
    saveTenant: async function(tenant) {
        // 参数校验
        if (_.isEmpty(tenant) || !_.isObject(tenant)) {
            throw new Error('租户为空，无法进行保存');
        }

        this.doParamValidation(tenant);

        // 租户名称重复性校验
        if (!_.isEmpty(await this.queryByCondition({ tenantName: tenant.tenantName }))) {
            throw new Error('租户名称已存在，无法进行保存');
        }

        // 管理员存在性校验
        if (_.isEmpty(await userService.queryById(tenant.adminId))) {
            throw new Error('管理员不存在，无法进行保存');
        }

        // 初始化参数
        tenant.id = keyUtils.generateUuid();

        // 进行保存
        await Tenant.create(tenant);
    },

    /**
     * 修改租户
     */
    modifyTenant: async function(tenant) {
        // 参数校验
        if (_.isEmpty(tenant) || !_.isObject(tenant)) {
            throw new Error('租户为空，无法进行修改');
        }

        validationUtils.checkBlank(tenant.id, '未指定租户ID，无法进行修改');
        this.doParamValidation(tenant);

        // 存在性校验
        const sourceTenant = await this.queryById(tenant.id);
        if (_.isEmpty(sourceTenant)) {
            throw new Error('租户不存在，无法进行修改');
        }

        // 租户名称校验
        if (sourceTenant.tenantName !== tenant.tenantName) {
            throw new Error('租户名称不允许进行修改');
        }

        // 管理员校验
        if (sourceTenant.adminId !== tenant.adminId) {
            if (_.isEmpty(await userService.queryById(tenant.adminId))) {
                throw new Error('管理员不存在，无法进行修改');
            }
        }

        // 进行修改
        await Tenant.update(tenant, {
            where: {
                id: tenant.id
            }
        });
    },

    /**
     * 删除租户 
     */
    removeTenant: async function(id) {
        // 参数校验
        validationUtils.checkBlank(id, '未指定租户ID，无法进行删除');

        // 存在性校验
        const sourceTenant = await this.queryById(id);
        if (_.isEmpty(sourceTenant)) {
            throw new Error('租户不存在，无法进行删除');
        }

        // 进行删除
        await Tenant.destroy({
            where: {
                id: sourceTenant.id
            }
        });
    },

    /**
     * 条件查询租户
     */
    queryByCondition: async function(condition) {
        // 参数校验
        if (_.isEmpty(condition)) {
            throw new Error('未指定条件，无法进行查询');
        }

        // 组装查询条件
        const query = {
            where: {}
        };

        if (!_.isEmpty(condition.tenantName)) {
            if (condition.tenantName.startsWith('%') || condition.tenantName.endsWith('%')) {
                query.where.tenantName = {
                    [Sequelize.Op.like]: condition.tenantName
                };
            } else {
                query.where.tenantName = condition.tenantName;
            }
        }

        if (!_.isEmpty(condition.adminId)) {
            query.where.adminId = condition.adminId;
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

            const result = await Tenant.findAndCountAll(query);
            return {
                total: result.count,
                rows: result.rows
            };
        }

        // 普通查询
        return await Tenant.findAll(query);
    },

    /**
     * ID查询租户
     */
    queryById: async function(id) {
        // 参数校验
        validationUtils.checkBlank(id, '未指定ID，无法查询租户');

        // 查询租户
        return await Tenant.findByPk(id);
    },

    /**
     * 参数校验
     */
    doParamValidation: function(tenant) {
        validationUtils.checkBlank(tenant.tenantName, '租户名称不能为空');
        validationUtils.checkBlank(tenant.adminId, '管理员ID不能为空');

        validationUtils.checkBlank(tenant.status, '状态不能为空');
        validationUtils.checkRange(tenant.status, ['0', '1'], '状态格式非法');
    }
};

module.exports = tenantService;