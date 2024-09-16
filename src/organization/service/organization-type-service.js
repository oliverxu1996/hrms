const _ = require('lodash');
const { Sequelize } = require('sequelize');

const validationUtils = require('../../utils/validation-utils');
const paginationUtils = require('../../utils/pagination-utils');
const keyUtils = require('../../utils/key-utils'); 

const OrganizationType = require('../model/organization-type-model');

/**
 * 组织类型服务
 * 
 * @author xuke
 * @date 2024/9/16
 */
const organizationTypeService = {

    /**
     * 保存组织类型
     */
    saveType: async function(type) {
        // 参数校验
        this.doParamValidation(type);

        // 类型编码重复性校验
        if (!_.isEmpty(await this.queryByCondition({ typeCode: type.typeCode }))) {
            throw new Error('类型编码已存在，无法进行保存');
        }

        // 初始化参数
        type.id = keyUtils.generateUuid();

        // 进行保存
        await OrganizationType.create(type);
    },

    /**
     * 修改组织类型
     */
    modifyType: async function(type) {
        // 参数校验
        this.doParamValidation(type);
        validationUtils.checkBlank(type.id, '未指定组织类型ID，无法进行修改');

        // 组织类型存在性校验
        const sourceType = await this.queryById(type.id);
        if (_.isEmpty(sourceType)) {
            throw new Error('组织类型不存在，无法进行修改');
        }

        // 类型编码重复性校验（如果修改）
        if (sourceType.typeCode !== type.typeCode) {
            if (!_.isEmpty(this.queryByCondition({ id_notIn: type.id, typeCode: type.typeCode }))) {
                throw new Error('类型编码已存在，无法进行修改');
            }
        }

        // 进行修改
        await OrganizationType.update(type, {
            where: {
                id: type.id
            }
        });
    },

    /**
     * 删除组织类型
     */
    removeType: async function(id) {
        // 参数校验
        validationUtils.checkBlank(id, '未指定组织类型ID，无法进行删除');

        // 存在性校验
        const sourceType = await this.queryById(id);
        if (_.isEmpty(sourceType)) {
            throw new Error('组织类型不存在，无法进行删除');
        }

        // 进行删除
        await OrganizationType.destroy({
            where: {
                id: sourceType.id
            }
        });
    },

    /**
     * 条件查询组织类型
     */
    queryByCondition: async function(condition) {
        // 参数校验
        validationUtils.checkObject(condition, '未指定条件，无法进行查询');

        // 组装查询条件
        const query = {
            where: {}
        };

        if (!_.isEmpty(condition.id_notIn)) {
            const ids = _.split(condition.id_notIn, ',');
            query.where.id = {
                [Sequelize.Op.notIn]: ids
            };
        }

        if (!_.isEmpty(condition.typeCode)) {
            if (condition.typeCode.startsWith('%') || condition.typeCode.endsWith('%')) {
                query.where.typeCode = {
                    [Sequelize.Op.like]: condition.typeCode
                };
            } else {
                query.where.typeCode = condition.typeCode;
            }
        }

        if (!_.isEmpty(condition.typeName)) {
            if (condition.typeName.startsWith('%') || condition.typeName.endsWith('%')) {
                query.where.typeName = {
                    [Sequelize.Op.like]: condition.typeName
                };
            } else {
                query.where.typeName = condition.typeName;
            }
        }

        if (!_.isEmpty(condition.status)) {
            validationUtils.checkRange(condition.status, ['0', '1'], '状态格式非法');
            query.where.status = condition.status;
        }

        // 处理排序条件
        if (!_.isEmpty(condition.sortBy) && !_.isEmpty(condition.order)) {
            validationUtils.checkRange(condition.order, ['ASC', 'DESC'], '排序条件格式非法');
            query.order = [
                [condition.sortBy, condition.order]
            ];
        }

        // 分页查询
        const pagination = paginationUtils.parseCondition(condition);
        if (!_.isEmpty(pagination)) {
            query.limit = pagination.limit;
            query.offset = pagination.offset;

            const result = await OrganizationType.findAndCountAll(query);
            return {
                total: result.count,
                rows: result.rows
            };
        }

        // 普通查询
        return await OrganizationType.findAll(query);
    },

    /**
     * ID查询组织类型
     */
    queryById: async function(id) {
        // 参数校验
        validationUtils.checkBlank(id, '未指定ID，无法查询组织类型');

        // 查询组织类型
        return await OrganizationType.findByPk(id);
    },

    /**
     * 参数校验
     */
    doParamValidation: async function(type) {
        validationUtils.checkObject(type, '组织类型不能为空');
        validationUtils.checkBlank(type.typeCode, '类型编码不能为空');
        validationUtils.checkBlank(type.typeName, '类型名称不能为空');
    }
};

module.exports = organizationTypeService;