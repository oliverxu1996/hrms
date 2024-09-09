/**
 * 认证配置
 * 
 * @author xuke
 * @date 2024/9/8
 */
const config = {
    
    /**
     * 验证码过期时间
     */
    captchaTtl: process.env.AUTH_CAPTCHA_TTL || 60 * 5,

    /**
     * JWT令牌Secret
     */
    jwtSecret: process.env.AUTH_JWT_SECRET || 's3cr3tK3y!@#123',

    /**
     * JWT令牌过期时间
     */
    jwtExpiry: process.env.AUTH_JWT_EXPIRY || 3600,

    /**
     * 免认证路径
     */
    excludedPaths: ['/auths/captcha', '/auths/login', '/auths/logout']
};

module.exports = config;