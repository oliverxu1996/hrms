const { DataTypes } = require('sequelize');

const { sequelize } = require('../../config/db-config');

/**
 * 租户套餐
 * 
 * @author xuke
 * 2024/9/13
 */
const TenantPackage = sequelize.define('TenantPackage', {
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
     * 套餐名称
     */
    packageName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'package_name',
        comment: '套餐名称'
    },

    /**
     * 套餐描述
     */
    description: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'description',
        comment: '套餐描述'
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
     * 关联菜单ID清单
     */
    menuIds: {
        type: DataTypes.JSON,
        allowNull: true,
        field: 'menu_ids',
        comment: '关联菜单ID清单'
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
    tableName: 't_hrms_tenant_package',
    timestamp: true,
    createdAt: 'createTime',
    updatedAt: 'updateTime'
});

module.exports = TenantPackage;