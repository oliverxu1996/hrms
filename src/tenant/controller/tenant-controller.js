const express = require('express');
const _ = require('lodash');
const qs = require('querystring');

const tenantService = require('../service/tenant-service');
const tenantSubscriptionService = require('../service/tenant-subscription-service');

/**
 * 租户相关接口
 * 
 * @author xuke
 * @date 2024/9/10
 */
const router = express.Router();

/**
 * 保存租户
 */
router.post('/', async (req, res) => {
    await tenantService.saveTenant(req.body);
    res.status(200).json({ code: 200, msg: '操作成功' });
});

/**
 * 修改租户
 */
router.put('/:id', async (req, res) => {
    await tenantService.modifyTenant({ id: req.params.id, ...req.body });
    res.status(200).json({ code: 200, msg: '操作成功' });
});

/**
 * 删除租户
 */
router.delete('/:id', async (req, res) => {
    await tenantService.removeTenant(req.params.id);
    res.status(200).json({ code: 200, msg: '操作成功' });
});

/**
 * 条件查询租户
 */
router.get('/', async (req, res) => {
    // 处理参数
    const condition = req.query;

    if (!_.isEmpty(condition.tenantName)) {
        condition.tenantName = qs.unescape(condition.tenantName);
    }

    condition.pageNum = _.isEmpty(condition.pageNum) ? 1 : _.parseInt(condition.pageNum);
    condition.pageSize = _.isEmpty(condition.pageSize) ? 10 : _.parseInt(condition.pageSize);

    condition.sortBy = _.isEmpty(condition.sortBy) ? 'createTime' : condition.sortBy;
    condition.order = _.isEmpty(condition.order) ? 'DESC' : condition.order;

    // 查询租户
    const result = await tenantService.queryByCondition(condition);
    res.status(200).json({ code: 200, msg: '操作成功', total: result.total, rows: result.rows });
});

/**
 * ID查询租户
 */
router.get('/:id', async (req, res) => {
    const tenant = await tenantService.queryById(req.params.id);
    res.status(200).json({ code: 200, msg: '操作成功', data: tenant });
});

/**
 * 发起租户订阅
 */
router.post('/:tenantId/subscriptions', async (req, res) => {
    await tenantSubscriptionService.startSubscription(req.params.tenantId, req.body.subscriptionType);
    res.status(200).json({ code: 200, msg: '操作成功' });
});

/**
 * 取消租户订阅
 */
router.delete('/:tenantId/subscriptions/:id', async (req, res) => {
    await tenantSubscriptionService.cancelSubscription(req.params.tenantId, req.params.id);
    res.status(200).json({ code: 200, msg: '操作成功' });
});

/**
 * 条件查询租户订阅
 */
router.get('/:tenantId/subscriptions', async (req, res) => {
    // 处理参数
    const condition = { tenantId: req.params.tenantId, ...req.query };

    condition.pageNum = _.isEmpty(condition.pageNum) ? 1 : _.parseInt(condition.pageNum);
    condition.pageSize = _.isEmpty(condition.pageSize) ? 10 : _.parseInt(condition.pageSize);

    condition.sortBy = _.isEmpty(condition.sortBy) ? 'createTime' : condition.sortBy;
    condition.order = _.isEmpty(condition.order) ? 'DESC' : condition.order;

    // 查询租户订阅
    const result = await tenantSubscriptionService.queryByCondition(condition);
    res.status(200).json({ code: 200, msg: '操作成功', total: result.total, rows: result.rows });
});

/**
 * ID查询租户订阅
 */
router.get('/:tenantId/subscriptions/:id', async (req, res) => {
    const tenant = await tenantService.queryById(req.params.tenantId);
    if (_.isEmpty(tenant)) {
        throw new Error('租户不存在，无法查询租户订阅');
    }

    const tenantSubscription = await tenantSubscriptionService.queryById(req.params.id);
    if (tenant.id !== tenantSubscription.tenantId) {
        throw new Error('租户无权限，无法查询租户订阅');
    }
    
    res.status(200).json({ code: 200, msg: '操作成功', data: tenantSubscription });
});

module.exports = router;