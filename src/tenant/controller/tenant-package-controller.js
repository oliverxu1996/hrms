const express = require('express');
const _ = require('lodash');
const qs = require('querystring');

const tenantPackageService = require('../service/tenant-package-service');

/**
 * 租户套餐相关接口
 * 
 * @author xuke
 * @date 2024/9/14
 */
const router = express.Router();

/**
 * 保存租户套餐
 */
router.post('/', async (req, res) => {
    await tenantPackageService.savePackage(req.body);
    res.status(200).json({ code: 200, msg: '操作成功' });
});

/**
 * 修改租户套餐
 */
router.put('/:id', async (req, res) => {
    await tenantPackageService.modifyPackage({ id: req.params.id, ...req.body });
    res.status(200).json({ code: 200, msg: '操作成功' });
});

/**
 * 删除租户套餐
 */
router.delete('/:id', async (req, res) => {
    await tenantPackageService.removePackage(req.params.id);
    res.status(200).json({ code: 200, msg: '操作成功' });
});

/**
 * 条件查询租户套餐
 */
router.get('/', async (req, res) => {
    // 处理参数
    const condition = req.query;

    if (!_.isEmpty(condition.packageName)) {
        condition.packageName = qs.unescape(condition.packageName);
    }

    condition.pageNum = _.isEmpty(condition.pageNum) ? 1 : _.parseInt(condition.pageNum);
    condition.pageSize = _.isEmpty(condition.pageSize) ? 10 : _.parseInt(condition.pageSize);

    condition.sortBy = _.isEmpty(condition.sortBy) ? 'createTime' : condition.sortBy;
    condition.order = _.isEmpty(condition.order) ? 'DESC' : condition.order;

    // 查询租户套餐
    const result = await tenantPackageService.queryByCondition(condition);
    res.status(200).json({ code: 200, msg: '操作成功', total: result.total, rows: result.rows });
});

/**
 * ID查询租户套餐
 */
router.get('/:id', async (req, res) => {
    const tenantPackage = await tenantPackageService.queryById(req.params.id);
    res.status(200).json({ code: 200, msg: '操作成功', data: tenantPackage });
});

module.exports = router;