const _ = require('lodash');

const validationUtils = require('./validation-utils');

/**
 * 树形工具
 * 
 * @author xuke
 * @date 2024/9/15
 */
const treeUtils = {
    
    /**
     * 构造树形
     */
    build: (data, idKey, parentIdKey) => {
        // 参数校验
        if (_.isEmpty(data) || !_.isArray(data)) {
            throw new Error('数据为空，无法构造树形');
        }

        validationUtils.checkBlank(idKey, 'ID键为空，无法构造树形');
        validationUtils.checkBlank(parentIdKey, 'PARENT键为空，无法构造树形');
        
        // 构造检索
        const dataLookup = {};
        data.forEach(each => {
            dataLookup[each[idKey]] = each;
            dataLookup[each[idKey]].children = [];
        });

        // 构造树形
        const tree = [];
        data.forEach(each => {
            if (!_.isEmpty(each[parentIdKey])) {
                dataLookup[each[parentIdKey]].children.push(dataLookup[each[idKey]]);
            } else {
                tree.push(dataLookup[each[idKey]]);
            }
        });

        // 返回树形
        return tree;
    }
};

module.exports = treeUtils;