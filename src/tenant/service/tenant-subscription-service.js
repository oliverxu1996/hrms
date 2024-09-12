const _ = require('lodash');
const { Sequelize } = require('sequelize');

const validationUtils = require('../../utils/validation-utils');
const paginationUtils = require('../../utils/pagination-utils');
const keyUtils = require('../../utils/key-utils');
const dateUtils = require('../../utils/date-utils');

const tenantService = require('./tenant-service');

const TenantSubscription = require('../model/tenant-subscription-model');

/**
 * 租户订阅服务
 * 
 * @author xuke
 * @date 2024/9/11
 */
const tenantSubscriptionService = {

    /**
     * 发起订阅
     */
    startSubscription: async function(tenantId, subscriptionType) {
        // 参数校验
        validationUtils.checkBlank(tenantId, '租户ID为空，无法发起订阅');
        
        validationUtils.checkBlank(subscriptionType, '订阅类型为空，无法发起订阅');
        validationUtils.checkRange(subscriptionType, ['1', '2', '3', '4'], '订阅类型格式非法，无法发起订阅');

        // 租户存在性校验
        const sourceTenant = await tenantService.queryById(tenantId);
        if (_.isEmpty(sourceTenant)) {
            throw new Error('租户不存在，无法发起订阅');
        }

        // 订阅存在性校验
        const sourceTenantSubscriptions = await tenantSubscriptionService.queryByCondition({
            tenantId: tenantId,
            endTime_gt: new Date(),
            status: '1'
        });
        if (!_.isEmpty(sourceTenantSubscriptions)) {
            throw new Error('存在启用租户订阅，无法发起订阅');
        }

        // 计算订阅启止时间
        const startDate = new Date();
        
        let endDate = null;
        switch (subscriptionType) {
            case "1":
                endDate = dateUtils.calculateEndDate(startDate, 'monthly');
                break;
            case "2":
                endDate = dateUtils.calculateEndDate(startDate, 'quarterly');
                break;
            case "3":
                endDate = dateUtils.calculateEndDate(startDate, 'half-yearly');
                break;
            case "4":
                endDate = dateUtils.calculateEndDate(startDate, 'yearly');
                break;
        }

        // 初始化参数
        const tenantSubscription = {
            id: keyUtils.generateUuid(),
            tenantId: tenantId,
            subscriptionType: subscriptionType,
            beginTime: startDate,
            endTime: endDate,
            status: "1"
        };

        // 进行保存
        await TenantSubscription.create(tenantSubscription);
    },

    /**
     * 取消订阅
     */
    cancelSubscription: async function(tenantId, id) {
        // 参数校验
        validationUtils.checkBlank(id, '未指定租户订阅ID，无法取消订阅');

        // 租户存在性校验
        const sourceTenant = await tenantService.queryById(tenantId);
        if (_.isEmpty(sourceTenant)) {
            throw new Error('租户不存在，无法取消订阅');
        }

        // 租户订阅存在性校验
        const sourceTenantSubscription = await this.queryById(id);
        if (_.isEmpty(sourceTenantSubscription)) {
            throw new Error('租户订阅不存在，无法取消订阅');
        }

        // 权限校验
        if (sourceTenant.id !== sourceTenantSubscription.tenantId) {
            throw new Error('无操作权限，无法取消订阅');
        }

        // 进行修改
        await TenantSubscription.update({ status: "0" }, {
            where: {
                id: sourceTenantSubscription.id
            }
        });
    },

    /**
     * 条件查询订阅
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

        if (!_.isEmpty(condition.tenantId)) {
            query.where.tenantId = condition.tenantId;
        }

        if (!_.isEmpty(condition.subscriptionType)) {
            query.where.subscriptionType = subscriptionType;
        }

        if (!_.isEmpty(condition.beginTime_lt)) {
            query.where.beginTime = {
                [Sequelize.Op.lt]: condition.beginTime_lt
            };
        }
        if (!_.isEmpty(condition.beginTime_gt)) {
            query.where.beginTime = {
                [Sequelize.Op.gt]: condition.beginTime_gt
            };
        }

        if (!_.isEmpty(condition.endTime_lt)) {
            query.where.endTime = {
                [Sequelize.Op.lt]: condition.endTime_lt
            };
        }
        if (!_.isEmpty(condition.endTime_gt)) {
            query.where.endTime = {
                [Sequelize.Op.gt]: condition.endTime_gt
            };
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

            const result = await TenantSubscription.findAndCountAll(query);
            return {
                total: result.count,
                rows: result.rows
            };
        }

        // 普通查询
        return await TenantSubscription.findAll(query);
    },

    /**
     * ID查询订阅
     */
    queryById: async function(id) {
        // 参数校验
        validationUtils.checkBlank(id, '未指定ID，无法查询租户订阅');

        // 查询租户订阅
        return await TenantSubscription.findByPk(id);
    }
};

module.exports = tenantSubscriptionService;