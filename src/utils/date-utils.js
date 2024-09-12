const moment = require('moment');

const validationUtils = require('./validation-utils');

/**
 * 日期工具
 * 
 * @author xuke
 * @date 2024/9/11
 */
const dateUtils = {

    /**
     * 计算截至时间
     */
    calculateEndDate: (startDate, interval) => {
        // 参数校验
        if (!startDate) {
            throw new Error('开始时间为空，无法计算结束时间');
        }

        validationUtils.checkBlank(interval, '区间类型为空，无法计算结束时间');
        validationUtils.checkRange(interval, ['monthly', 'quarterly', 'half-yearly', 'yearly'], '区间类型格式非法，无法计算结束时间');

        // 处理开始时间
        const start = moment(startDate);

        // 处理结束时间
        let end = null;
        switch (interval) {
            case 'monthly':
                end = start.add(1, 'month');
                break;
            case 'quarterly':
                end = start.add(1, 'quarterly');
                break;
            case 'half-yearly':
                end = start.add(6, 'months');
                break;
            case 'yearly':
                end = start.add(1, 'year');
                break;
        }

        return end.toDate();
    }
};

module.exports = dateUtils;