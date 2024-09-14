const _ = require('lodash');

const contextUtils = require('../utils/context-utils');

/**
 * 租户处理器
 * 
 * @author xuke
 * @date 2024/9/15
 */
const tenantHandler = (req, res, next) => {
    // 检查用户凭证
    if (_.isEmpty(req.userCredential) || !_.isObject(req.userCredential)) {
        return next();
    }

    // 获取租户信息
    const tenantId = req.userCredential.tenantId;
    if (_.isEmpty(tenantId)) {
        return next();
    }

    // 设置上下文
    const pairs = [{ key: 'tenantId', value: tenantId }];
    contextUtils.set(pairs, () => next());
};

module.exports = tenantHandler;