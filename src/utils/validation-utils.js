const _ = require('lodash');

/**
 * 数据校验工具
 * 
 * @author xuke
 * @date 2024/9/1
 */
const validationUtils = {

    /**
     * 检查字符串是否为空
     */
    checkBlank: function(source, errorMessage) {
        if (_.isString(source) && !_.isEmpty(_.trim(source))) {
            return;            
        }

        throw new Error(errorMessage);
    },

    /**
     * 检查字符串值域范围
     */
    checkRange: function(source, range, errorMessage) {
        this.checkBlank(source, errorMessage);

        if (!_.isArray(range) || _.isEmpty(range)) {
            throw new Error('未指定值域范围');
        }

        const anyMatch = _.includes(range, source);
        if (!anyMatch) {
            throw new Error(errorMessage);
        }
    },

    /**
     * 检查是否为空
     */
    checkEmpty: function(source, errorMessage) {
        if (_.isEmpty(source)) {
            throw new Error(errorMessage);
        }
    },

    /**
     * 检查对象是否为空
     */
    checkObject: function(source, errorMessage) {
        if (!_.isObject(source)) {
            throw new Error('对象格式非法');
        }

        if (_.isEmpty(source)) {
            throw new Error(errorMessage);
        }
    },

    /**
     * 检查数组是否为空
     */
    checkArray: function(source, errorMessage) {
        if (!_.isArray(source)) {
            throw new Error('数组格式非法');
        }

        if (_.isEmpty(source)) {
            throw new Error(errorMessage);
        }
    },

    /**
     * 检查是否非零
     */
    checkNonZero: function(source, errorMessage) {
        if (_.isNumber(source) && source > 0) {
            return;
        }

        throw new Error(errorMessage);
    }
};

module.exports = validationUtils;