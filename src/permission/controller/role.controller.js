const express = require('express');
const _ = require('lodash');
const qs = require('querystring');

const roleService = require('../service/role-service');

/**
 * 角色相关接口
 * 
 * @author xuke
 * @date 2024/9/16
 */
const router = express.Router();

/**
 * 保存角色
 */
router.post('/', async (req, res) => {
    await roleService.saveRole(req.body);
    res.status(200).json({ code: 200, msg: '操作成功' });
});

/**
 * 修改角色
 */
router.put('/:id', async (req, res) => {
    await roleService.modifyRole({ id: req.params.id, ...req.body });
    res.status(200).json({ code: 200, msg: '操作成功' });
});

/**
 * 删除角色
 */
router.delete('/:id', async (req, res) => {
    await roleService.removeRole(req.params.id);
    res.status(200).json({ code: 200, msg: '操作成功' });
});

/**
 * 条件查询角色
 */
router.get('/', async (req, res) => {
    // 处理参数
    const condition = req.query;

    if (!_.isEmpty(condition.roleName)) {
        condition.roleName = qs.unescape(condition.roleName);
    }

    condition.sortBy = _.isEmpty(condition.sortBy) ? 'orderNum' : condition.sortBy;
    condition.order = _.isEmpty(condition.order) ? 'ASC' : condition.order;

    // 查询角色
    const result = await roleService.queryByCondition(condition);
    res.status(200).json({ code: 200, msg: '操作成功', data: result });
});

/**
 * ID查询角色
 */
router.get('/:id', async (req, res) => {
    const role = await roleService.queryById(req.params.id);
    res.status(200).json({ code: 200, msg: '操作成功', data: role });
});

module.exports = router;