const { DataTypes } = require('sequelize');

const { sequelize } = require('../../config/db-config');

/**
 * 组织模型
 * 
 * @author xuke
 * @date 2024/9/17
 */
const Organization = sequelize.define('Organization', {

    /***** 基本信息 *****/

    /**
     * 主键ID
     */
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        field: 'id',
        comment: '主键ID'
    },

    /**
     * 所属租户ID
     */
    tenantId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'tenant_id',
        comment: '所属租户ID'
    },

    /**
     * 上级组织ID
     */
    parentId: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'parent_id',
        comment: '所属上级组织ID'
    },

    /**
     * 组织编码
     */
    organizationCode: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'organization_code',
        comment: '组织编码'
    },

    /**
     * 组织简称
     */
    organizationShortName: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'organization_short_name',
        comment: '组织名称'
    },

    /**
     * 组织全称
     */
    organizationFullName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'organization_full_name',
        comment: '组织全称'
    },

    /**
     * 所属组织类型ID
     */
    organizationTypeId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'organization_type_id',
        comment: '所属组织类型ID'
    },

    /**
     * 是否纳税主体
     * - 0=否
     * - 1=是
     */
    isTaxableEntity: {
        type: DataTypes.ENUM,
        values: ['0', '1'],
        allowNull: false,
        field: 'is_taxable_entity',
        comment: '是否纳税主体'
    },

    /**
     * 统一社会信用代码
     */
    usci: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'usci',
        comment: '统一社会信用代码'
    },

    /**
     * 成立日期
     */
    foundDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        field: 'found_date',
        comment: '成立日期'
    },

    /**
     * 单位负责人ID（或法人）
     */
    representativeId: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'representativee_id',
        comment: '单位负责人ID（或法人）'
    },

    /**
     * 单位负责人联系电话（或法人）
     */
    representativePhone: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'representative_phone',
        comment: '单位负责人联系电话（或法人）'
    },

    /***** 组织注册地 *****/

    /**
     * 注册地-国家或地区ID
     */
    registeredNationId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'registered_nation_id',
        comment: '注册地-国家或地区ID'
    },

    /**
     * 注册地-行政区划ID
     */
    registeredJurisdictionId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'registered_jurisdiction_id',
        comment: '注册地-行政区划ID'
    },

    /**
     * 注册地-注册地址
     */
    registeredAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'registered_address',
        comment: '注册地-注册地址'
    },

    /***** 组织经营地 *****/

    /**
     * 经营地-国家或地区ID
     */
    businessNationId: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'business_nation_id',
        comment: '经营地-国家或地区ID'
    },

    /**
     * 经营地-行政区划ID
     */
    businessJurisdictionId: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'business_jurisdiction_id',
        comment: '经营地-行政区划ID'
    },

    /**
     * 经营地-营业地址
     */
    businessAddress: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'business_address',
        comment: '经营地-营业地址'
    },

    /***** 其它信息 *****/

    /**
     * 状态
     * - 0=禁用
     * - 1=启用
     */
    status: {
        type: DataTypes.ENUM,
        values: ['0', '1'],
        allowNull: false,
        field: 'status',
        comment: '状态'
    },

    /**
     * 排序号
     */
    orderNum: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'order_num',
        comment: '排序号'
    },

    /**
     * 创建时间
     */
    createTime: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'create_time',
        comment: '创建时间'
    },

    /**
     * 更新时间
     */
    updateTime: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'update_time',
        comment: '更新时间'
    }
}, {
    /**
     * 基础设置
     */
    tableName: 't_hrms_organization',
    timestamps: true,
    createdAt: 'createTime',
    updatedAt: 'updateTime'
});

module.exports = Organization;