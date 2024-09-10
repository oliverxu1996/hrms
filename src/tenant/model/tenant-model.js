const { DataTypes } = require('sequelize');

const { sequelize } = require('../../config/db-config');

/**
 * 租户模型
 * 
 * @author xuke
 * @date 2024/9/9
 */
const Tenant = sequelize.define('Tenant', {
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
     * 租户名称
     */
    tenantName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: 'tenant_name',
        comment: '租户名称'
    },

    /**
     * 管理员ID
     */
    adminId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'admin_id',
        comment: '管理员ID'
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
    tableName: 't_hrms_tenant',
    timestamps: true,
    createdAt: 'createTime',
    updatedAt: 'updateTime'
});

module.exports = Tenant;