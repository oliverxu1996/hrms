const _ = require('lodash');

const authConfig = require('../../config/auth-config');

const keyUtils = require('../../utils/key-utils');
const jwtUtils = require('../../utils/jwt-utils');
const cacheUtils = require('../../utils/cache-utils');

// 常量
const JWT_SECRET = authConfig.jwtSecret;
const JWT_EXPIRY = authConfig.jwtExpiry;
const CACHE_SESSION_KEY = 'AUTH_TOKEN_SESSION';
const CACHE_SESSION_TTL = JWT_EXPIRY;

/**
 * 认证令牌服务
 * 
 * @author xuke
 * @date 2024/9/8
 */
const authTokenService = {

    /**
     * 生成令牌
     */
    generate: function(user) {
        // 参数校验
        if (_.isEmpty(user) || !_.isObject(user)) {
            throw new Error('用户为空，无法生成令牌');
        }

        // 生成会话ID
        const sessionId = keyUtils.generateUuid();

        // 生成令牌
        const token = jwtUtils.sign({ id: user.id, sessionId: sessionId }, JWT_SECRET, { expiresIn: JWT_EXPIRY });

        // 缓存会话
        cacheUtils.set(CACHE_SESSION_KEY + ":" + user.id, sessionId, CACHE_SESSION_TTL);

        // 返回令牌
        return token;
    },

    /**
     * 校验令牌
     */
    verify: function(token) {
        // 参数校验
        if (_.isEmpty(token)) {
            throw new Error('令牌为空，无法进行校验');
        }

        // 令牌校验
        const payload = jwtUtils.verify(token, JWT_SECRET);

        // 会话校验
        const sessionId = cacheUtils.get(CACHE_SESSION_KEY + ":" + payload.id);
        if (_.isEmpty(sessionId)) {
            throw new Error('会话已过期或不存在');
        }
        
        if (payload.sessionId !== sessionId) {
            throw new Error('您已经登录了一个账户，请稍后再试或退出当前登录以继续');
        }

        // 返回信息
        return payload;
    },

    /**
     * 过期令牌
     */
    invalidate: function(token) {
        // 校验令牌
        const payload = this.verify(token);

        // 删除会话
        cacheUtils.delete(CACHE_SESSION_KEY + ":" + payload.id);
    }
};

module.exports = authTokenService;