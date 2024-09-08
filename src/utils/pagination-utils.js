const _ = require('lodash');

/**
 * 分页工具
 * 
 * @author xuke
 * @date 2024/9/2
 */
const paginationUtils = {

    /**
     * 解析分页条件
     */
    parseCondition: condition => {
        // 读取原始条件
        let { pageNum, pageSize } = condition;

        // 检查是否分页
        if (_.isNil(pageNum) || _.isNil(pageSize)) {
            return null;
        }

        // 解析原始条件
        if (!_.isNumber(pageNum)) {
            pageNum = _.parseInt(pageNum);
        }
        pageNum = pageNum <= 0 ? 1 : pageNum;

        if (!_.isNumber(pageSize)) {
            pageSize = _.parseInt(pageSize);
        }
        pageSize = pageSize <= 0 ? 10 : pageSize;

        // 转换目标条件
        return {
            limit: pageSize,
            offset: (pageNum - 1) * pageSize
        };
    }
};

module.exports = paginationUtils;