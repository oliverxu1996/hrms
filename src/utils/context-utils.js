const cls = require('cls-hooked');
const _ = require('lodash');

/**
 * 上下文工具
 * 
 * @author xuke
 * @date 2024/9/14
 */
const contextUtils = {

    /**
     * 命名空间 
     */
    namespace: cls.createNamespace('hrms-namespace'),

    /**
     * 设置上下文
     */
    set: function(pairs, callback) {
        // 参数检查
        if (!_.isArray(pairs) || _.isEmpty(pairs)) {
            throw new Error('键值对为空，无法设置上下文');
        }

        if (_.isNull(callback) || !_.isFunction(callback)) {
            throw new Error('回调函数为空，无法设置上下文');
        }

        // 运行与设置上下文
        const self = this;
        self.namespace.run(() => {
            pairs.forEach(each => self.namespace.set(each.key, each.value));
            callback();
        });
    },

    /**
     * 获取上下文
     */
    get: function(key) {
        return this.namespace.get(key);
    }
};

module.exports = contextUtils;