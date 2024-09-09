const NodeCache = require('node-cache');

/**
 * 缓存工具
 * 
 * @author xuke
 * @date 2024/9/8
 */
const cacheUtils = {

    /**
     * 内部缓存
     */
    cache: new NodeCache(),
    
    /**
     * 设置缓存
     */
    set: function(key, value, ttl) {
        this.cache.set(key, value, ttl);
    },

    /**
     * 获取缓存
     */
    get: function(key) {
        const value = this.cache.get(key);
        return value;
    },

    /**
     * 删除缓存
     */
    delete: function(key) {
        this.cache.del(key);
    }
};

module.exports = cacheUtils;