const express = require('express');
const _ = require('lodash');
const qs = require('querystring');

const menuService = require('../service/menu-service');

/**
 * 菜单相关接口
 * 
 * @author xuke
 * @date 2024/9/15
 */
const router = express.Router();

/**
 * 保存菜单
 */
router.post('/', async (req, res) => {
    await menuService.saveMenu(req.body);
    res.status(200).json({ code: 200, msg: '操作成功' });
});

/**
 * 修改菜单
 */
router.put('/:id', async (req, res) => {
    await menuService.modifyMenu({ id: req.params.id, ...req.body });
    res.status(200).json({ code: 200, msg: '操作成功' });
});

/**
 * 删除菜单
 */
router.delete('/:id', async (req, res) => {
    await menuService.removeMenu(req.params.id);
    res.status(200).json({ code: 200, msg: '操作成功' });
});

/**
 * 条件查询菜单
 */
router.get('/', async (req, res) => {
    // 处理参数
    const condition = req.query;

    if (!_.isEmpty(condition.menuName)) {
        condition.menuName = qs.unescape(condition.menuName);
    }

    if (!_.isEmpty(condition.tree)) {
        condition.tree = (condition.tree === 'true');
    }

    condition.sortBy = _.isEmpty(condition.sortBy) ? 'orderNum' : condition.sortBy;
    condition.order = _.isEmpty(condition.order) ? 'ASC' : condition.order;

    // 查询菜单
    const result = await menuService.queryByCondition(condition);
    res.status(200).json({ code: 200, msg: '操作成功', data: result });
});

/**
 * ID查询菜单
 */
router.get('/:id', async (req, res) => {
    const menu = await menuService.queryById(req.params.id);
    res.status(200).json({ code: 200, msg: '操作成功', data: menu });
});

module.exports = router;