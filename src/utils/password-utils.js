const _ = require('lodash');
const bcrypt = require('bcrypt');

/**
 * 密码工具
 * 
 * @author xuke
 * @date 2024/9/2
 */
const passwordUtils = {

    /**
     * 校验密码强度
     */
    validateStrength: source => {
        // 检查正则表达式
        if (_.isEmpty(this.regexp)) {
            this.regexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        }

        const match = this.regexp.test(source);
        if (!match) {
            throw new Error('密码强度校验失败，必须包含大小写字母、数字，以及特殊字符');
        }
    },

    /**
     * 加密密码
     */
    hash: async source => {
        const hash = await bcrypt.hash(source, 10);
        return hash;
    },

    /**
     * 校验密码
     */
    compare: async (source, target) => {
        const match = await bcrypt.compare(source, target);
        if (!match) {
            throw new Error('用户名或密码错误');
        }
    }
};

module.exports = passwordUtils;