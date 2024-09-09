const _ = require('lodash');

const authConfig = require('../../config/auth-config');

const captchaUtils = require('../../utils/captcha-utils');
const cacheUtils = require('../../utils/cache-utils');
const passwordUtils = require('../../utils/password-utils');

const userService = require('../../user/service/user-service');
const authTokenService = require('./auth-token-service');

// 常量
const CACHE_CAPTCHA_KEY = 'AUTH_LOGIN_CAPTCHA';
const CACHE_CAPTCHA_TTL = authConfig.captchaTtl;

/**
 * 认证登陆服务
 * 
 * @author xuke
 * @date 2024/9/8
 */
const authLoginService = {

    /**
     * 获取验证码
     */
    getCaptcha: () => {
        // 生成验证码
        const captcha = captchaUtils.generateCaptcha();

        // 缓存验证码
        cacheUtils.set(CACHE_CAPTCHA_KEY + ":" + captcha.uuid, captcha.text, CACHE_CAPTCHA_TTL);

        // 返回验证码
        return {
            uuid: captcha.uuid,
            buffer: captcha.buffer
        };
    },

    /**
     * 用户登陆
     */
    login: async (username, password, captcha, uuid) => {
        // 参数校验
        if (_.isEmpty(username)) {
            throw new Error('用户为空，无法进行登陆');
        }
        if (_.isEmpty(password)) {
            throw new Error('密码为空，无法进行登陆');
        }
        if (_.isEmpty(captcha)) {
            throw new Error('验证码为空，无法进行登陆');
        }
        if (_.isEmpty(uuid)) {
            throw new Error('UUID为空，无法进行登陆');
        }

        // 存在性校验
        const sourceUsers = await userService.queryByCondition({ username: username }, 'withPassword');
        if (_.isEmpty(sourceUsers)) {
            throw new Error('用户不存在，无法进行登陆');
        }
        const loginUser = sourceUsers[0];

        // 状态校验
        if ('1' !== loginUser.status) {
            throw new Error('用户被禁用，无法进行登陆');
        }

        // 验证码校验
        const sourceCaptcha = cacheUtils.get(CACHE_CAPTCHA_KEY + ":" + uuid);
        if (_.isEmpty(sourceCaptcha)) {
            throw new Error('验证码已过期，无法进行登陆');
        }

        if (sourceCaptcha !== captcha) {
            throw new Error('验证码不正确，无法进行登陆');
        }

        // 密码校验
        await passwordUtils.compare(password, loginUser.password);

        // 生成令牌
        const token = authTokenService.generate(loginUser);

        // 返回令牌
        return token;
    }
};

module.exports = authLoginService;