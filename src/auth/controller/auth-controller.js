const express = require('express');
const _ = require('lodash');

const bearerUtils = require('../../utils/bearer-utils');

const authLoginService = require('../service/auth-login-service');
const authTokenService = require('../service/auth-token-service');

/**
 * 认证登陆相关接口
 * 
 * @author xuke
 * @date 2024/9/9
 */
const router = express.Router();

/**
 * 获取验证码
 */
router.get('/captcha', async (req, res) => {
    const captcha = authLoginService.getCaptcha();
    res.status(200).json(captcha);
});

/**
 * 用户登陆
 */
router.post('/login', async (req, res) => {
    const { username, password, captcha, uuid } = req.body;
    const token = await authLoginService.login(username, password, captcha, uuid);
    res.status(200).json({ code: 200, msg: '操作成功', data: token });
});

/**
 * 用户登出
 */
router.post('/logout', async (req, res) => {
    // 获取令牌
    const bearerToken = req.headers['authorization'];
    const token = bearerUtils.extractToken(bearerToken);
    if (_.isEmpty(token)) {
        return res.sendStatus(403);
    }

    // 过期令牌
    authTokenService.invalidate(token);

    // 返回响应
    res.status(200).json({ code: '200', msg: '操作成功' });
});

module.exports = router;