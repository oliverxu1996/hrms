const { DataTypes } = require('sequelize');

const { sequelize } = require('../../config/db-config');

/**
 * 股东模型
 * 
 * @author xuke
 * @date 2024/9/17
 */
const Shareholder = sequelize.define('Shareholder', {

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
     * 被持有组织ID
     */
    heldOrganizationId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'held_organization_id',
        comment: '被持有组织ID'
    },

    /**
     * 持久组织ID
     */
    holderOrganizationId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'holder_organization_id',
        comment: '持有组织ID'
    },

    /**
     * 所属股东类别ID
     */
    shareholderTypeId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'shareholder_type_id',
        comment: '所属股东类别ID'
    },

    /**
     * 持股比例
     */
    holdingPercentage: {
        type: DataTypes.FLOAT,
        allowNull: false,
        field: 'holding_percentage',
        comment: '持股比例'
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
    tableName: 't_hrms_shareholder',
    timestamps: true,
    createdAt: 'createTime',
    updatedAt: 'updateTime'
});

module.exports = Shareholder;