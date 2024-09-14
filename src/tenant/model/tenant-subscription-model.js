const { DataTypes } = require('sequelize');

const { sequelize } = require('../../config/db-config');

/**
 * 租户订阅模型
 * 
 * @author xuke
 * @date 2024/9/10
 */
const TenantSubscription = sequelize.define('TenantSubscription', {
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
     * 租户ID
     */
    tenantId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'tenant_id',
        comment: '租户ID'
    },

    /**
     * 租户套餐ID
     */
    tenantPackageId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'tenant_package_id',
        comment: '租户套餐ID'
    },

    /**
     * 订阅类型
     * - 1=月度
     * - 2=季度
     * - 3=半年度
     * - 4=年度
     */
    subscriptionType: {
        type: DataTypes.ENUM,
        values: ['1', '2', '3', '4', '5'],
        allowNull: false,
        field: 'subscription_type',
        comment: '订阅类型'
    },

    /**
     * 起始时间
     */
    beginTime: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'begin_time',
        comment: '起始时间'
    },

    /**
     * 结束时间
     */
    endTime: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'end_time',
        comment: '结束时间'
    },

    /**
     * 用户数量
     */
    userCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_count',
        comment: '用户数量'
    },

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
    tableName: 't_hrms_tenant_subscription',
    timestamp: true,
    createdAt: 'createTime',
    updatedAt: 'updateTime'
});

module.exports = TenantSubscription;