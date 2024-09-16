const { DataTypes } = require('sequelize');

const { sequelize } = require('../../config/db-config');

/**
 * 组织类型模型
 * 
 * @author xuke
 * @date 2024/9/16
 */
const OrganizationType = sequelize.define('OrganizationType', {

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
     * 类型编码
     */
    typeCode: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'type_code',
        comment: '类型编码'
    },

    /**
     * 类型名称
     */
    typeName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'type_name',
        comment: '类型名称'
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
    tableName: 't_hrms_organization_type',
    timestamps: true,
    createdAt: 'createTime',
    updatedAt: 'updateTime'
});

module.exports = OrganizationType;