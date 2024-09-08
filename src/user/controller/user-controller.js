const express = require('express');
const _ = require('lodash');
const qs = require('querystring');

const userService = require('../service/user-service');

/**
 * 用户相关接口
 * 
 * @author xuke
 * @date 2024/9/2
 */
const router = express.Router();

/**
 * 保存用户
 */
router.post('/', async (req, res) => {
    await userService.saveUser(req.body);
    res.status(200).json({ code: 200, msg: '操作成功' });
});

/**
 * 修改用户
 */
router.put('/:id', async (req, res) => {
    await userService.modifyUser({ id: req.params.id, ...req.body });
    res.status(200).json({ code: 200, msg: '操作成功' });
});

/**
 * 删除用户
 */
router.delete('/:id', async (req, res) => {
    await userService.removeUser(req.params.id);
    res.status(200).json({ code: 200, msg: '操作成功' });
});

/**
 * 重置用户密码
 */
router.put('/:id/reset-password', async (req, res) => {
    await userService.resetPassword(req.params.id, req.body.password);
    res.status(200).json({ code: 200, msg: '操作成功' });
});

/**
 * 条件查询用户
 */
router.get('/', async (req, res) => {
    // 处理参数
    const condition = req.query;
    
    if (!_.isEmpty(condition.nickname)) {
        condition.nickname = qs.unescape(condition.nickname);
    }

    condition.pageNum = _.isEmpty(condition.pageNum) ? 1 : _.parseInt(condition.pageNum);
    condition.pageSize = _.isEmpty(condition.pageSize) ? 10 : _.parseInt(condition.pageSize);

    condition.sortBy = _.isEmpty(condition.sortBy) ? 'createTime' : condition.sortBy;
    condition.order = _.isEmpty(condition.order) ? 'DESC' : condition.order;

    // 查询用户
    const result = await userService.queryByCondition(condition);
    res.status(200).json({ code: 200, msg: '操作成功', total: result.total, rows: result.rows });
});

/**
 * ID查询用户
 */
router.get('/:id', async (req, res) => {
    const user = await userService.queryById(req.params.id);
    res.status(200).json({ code: 200, msg: '操作成功', data: user });
});

module.exports = router;