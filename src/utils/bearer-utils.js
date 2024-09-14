const _ = require('lodash');

/**
 * Bearer令牌工具
 * 
 * @author xuke
 * @date 2024/9/15
 */
const bearerUtils = {

    /**
     * 提取令牌
     */
    extractToken: bearerToken => {
        // 参数检查
        if (_.isEmpty(bearerToken)) {
            return null;
        }

        if (!bearerToken.match(/^Bearer\s+(\S+)$/)) {
            return null;
        }

        // 提取值
        const token = bearerToken.split(' ')[1];
        
        // 返回令牌
        return token;
    }
};

module.exports = bearerUtils;