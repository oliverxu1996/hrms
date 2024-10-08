/**
 * 认证配置
 * 
 * @author xuke
 * @date 2024/9/8
 */
const config = {

    /**
     * 调试模式
     */
    debug: process.env.AUTH_DEBUG,
    
    /**
     * 验证码过期时间
     */
    captchaTtl: process.env.AUTH_CAPTCHA_TTL,

    /**
     * JWT令牌Secret
     */
    jwtSecret: process.env.AUTH_JWT_SECRET,

    /**
     * JWT令牌过期时间
     */
    jwtExpiry: process.env.AUTH_JWT_EXPIRY,

    /**
     * 免认证路径
     */
    excludedPaths: ['/auths/captcha', '/auths/login', '/auths/logout']
};

module.exports = config;