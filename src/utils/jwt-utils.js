const jwt = require('jsonwebtoken');

/**
 * JWT令牌工具
 * 
 * @author xuke
 * @date 2024/9/85
 */
const jwtUtils = {

    /**
     * 签名JWT令牌
     */
    sign: (payload, secret, expiry) => {
        const token = jwt.sign(payload, secret, expiry);
        return token;
    },

    /**
     * 验证JWT令牌
     */
    verify: (token, secret) => {
        try {
            const payload = jwt.verify(token, secret);
            return payload;
        } catch(err) {
            throw new Error('JWT令牌校验失败: ' + err.toString());
        }
    }
};

module.exports = jwtUtils;