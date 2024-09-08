const _ = require('lodash');
const ShortUniqueId = require('short-unique-id');
const { v4: uuidv4 } = require('uuid');

/**
 * ID生成工具
 * 
 * @author xuke
 * @date 2024/9/1
 */
const keyUtils = {

    /**
     * 生成ID
     */
    generateId: function() {
        // 检查生成器
        if (_.isEmpty(this.uid)) {
            this.uid = new ShortUniqueId({ length: 20, dictionary: 'number' });
        }

        const id = this.uid.randomUUID();
        return _.parseInt(id);
    },

    /**
     * 生成UUID
     */
    generateUuid: () => {
        const uuid = uuidv4();
        return uuid;
    }
};

module.exports = keyUtils;