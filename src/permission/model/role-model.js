const { DataTypes } = require('sequelize');

const { sequelize } = require('../../config/db-config');

/**
 * 角色模型
 * 
 * @author xuke
 * @date 2024/9/15
 */
const Role = sequelize.define('Role', {
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
     * 角色名称
     */
    roleName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'role_name',
        comment: '角色名称'
    },

    /**
     * 数据权限
     * - 1=所有数据权限
     * - 2=自定义数据权限
     * - 3=本部门数据权限
     * - 4=本部门及以下数据权限
     * - 5=仅本人数据权限
     */
    dataScope: {
        type: DataTypes.ENUM,
        values: ['1', '2', '3', '4', '5'],
        allowNull: false,
        field: 'data_scope',
        comment: '数据权限'
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
    tableName: 't_hrms_role',
    timestamps: true,
    createdAt: 'createTime',
    updatedAt: 'updateTime'
});

module.exports = Role;