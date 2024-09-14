const _ = require('lodash');

const authConfig = require('../config/auth-config');

const bearerUtils = require('../utils/bearer-utils');

const authTokenService = require('../auth/service/auth-token-service');

/**
 * 令牌校验器
 * 
 * @author xuke
 * @date 2024/9/9
 */
const tokenVerifier = (req, res, next) => {
    // 调试模式
    if (authConfig.debug) {
        return next();
    }

    // 免校验处理
    if (authConfig.excludedPaths.includes(req.path)) {
        return next();
    }

    // 获取令牌
    const bearerToken = req.headers['authorization'];
    const token = bearerUtils.extractToken(bearerToken);
    if (_.isEmpty(token)) {
        return res.sendStatus(403);
    }

    // 校验令牌
    try {
        const userCredential = authTokenService.verify(token);

        // 绑定用户凭证
        req.userCredential = userCredential;
    } catch(err) {
        return res.status(403).send(err.toString());    
    }

    // 处理请求
    next();
};

module.exports = tokenVerifier;