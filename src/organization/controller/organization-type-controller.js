const express = require('express');
const _ = require('lodash');
const qs = require('querystring');

const organizationTypeService = require('../service/organization-type-service');

/**
 * 组织类型相关接口
 * 
 * @author xuke
 * @date 2024/9/17
 */
const router = express.Router();

/**
 * 保存组织类型
 */
router.post('/', async (req, res) => {
    await organizationTypeService.saveType(req.body);
    res.status(200).json({ code: 200, msg: '操作成功' });
});

/**
 * 修改组织类型
 */
router.put('/:id', async (req, res) => {
    await organizationTypeService.modifyType({ id: req.params.id, ...req.body });
    res.status(200).json({ code: 200, msg: '操作成功' });
});

/**
 * 删除组织类型
 */
router.delete('/:id', async (req, res) => {
    await organizationTypeService.removeType(req.params.id);
    res.status(200).json({ code: 200, msg: '操作成功' });
});

/**
 * 条件查询组织类型
 */
router.get('/', async (req, res) => {
    // 处理参数
    const condition = req.query;

    if (!_.isEmpty(condition.typeCode)) {
        condition.typeCode = qs.unescape(condition.typeCode);
    }

    if (!_.isEmpty(condition.typeName)) {
        condition.typeName = qs.unescape(condition.typeName);
    }

    condition.sortBy = _.isEmpty(condition.sortBy) ? 'orderNum' : condition.sortBy;
    condition.order = _.isEmpty(condition.order) ? 'ASC' : condition.order;

    // 查询组织类型
    const result = await organizationTypeService.queryByCondition(condition);
    res.status(200).json({ code: 200, msg: '操作成功', data: result });
});

/**
 * ID查询组织类型
 */
router.get('/:id', async (req, res) => {
    const organizationType = await organizationTypeService.queryById(req.params.id);
    res.status(200).json({ code: 200, msg: '操作成功', data: organizationType });
});

module.exports = router;