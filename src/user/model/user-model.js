const { DataTypes } = require('sequelize');

const { sequelize } = require('../../config/db-config');

// 配置用户模型
const User = sequelize.define('User', {
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
     * 所属组织ID
     */
    deptId: {
        type: DataTypes.BIGINT(20),
        allowNull: true,
        field: 'dept_id',
        comment: '所属组织ID'
    },

    /**
     * 用户名
     */
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: 'username',
        comment: '用户名'
    },

    /**
     * 用户昵称
     */
    nickname: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'nickname',
        comment: '用户昵称'       
    },

    /**
     * 手机号码
     */
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: 'phone_number',
        comment: '手机号码'
    },

    /**
     * 性别
     * - 1=男
     * - 2=女
     */
    gender: {
        type: DataTypes.ENUM,
        values: ['1', '2'],
        allowNull: false,
        field: 'gender',
        comment: '性别'
    },

    /**
     * 密码
     */
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'password',
        comment: '密码'
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
    tableName: 't_hrms_user',
    timestamps: true,
    createdAt: 'createTime',
    updatedAt: 'updateTime',
    
    /**
     * 作用域
     */
    scopes: {
        query: {
            attributes: { exclude: ['password'] }
        }
    }
});

module.exports = User;