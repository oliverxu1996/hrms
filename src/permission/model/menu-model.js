const { DataTypes } = require('sequelize');

const { sequelize } = require('../../config/db-config');

/**
 * 菜单模型
 * 
 * @author xuke
 * @date 2024/9/15
 */
const Menu = sequelize.define('Menu', {
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
     * 父级菜单ID
     */
    parentId: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'parent_id',
        comment: '父级菜单ID'
    },

    /**
     * 菜单名称
     */
    menuName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'menu_name',
        comment: '菜单名称'
    },

    /**
     * 菜单类型
     * - 1=目录
     * - 2=菜单
     * - 3=按钮
     */
    menuType: {
        type: DataTypes.ENUM,
        values: ['1', '2', '3'],
        allowNull: false,
        field: 'menu_type',
        comment: '菜单类型'
    },

    /**
     * 路由路径
     */
    path: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'path',
        comment: '路由路径'
    },

    /**
     * 路由参数
     */
    query: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'query',
        comment: '路由参数'
    },

    /**
     * 组件路径
     */
    component: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'component',
        comment: '组件路径'
    },

    /**
     * 权限标识清单
     */
    permissions: {
        type: DataTypes.JSON,
        allowNull: true,
        field: 'permissions',
        comment: '权限标识清单'
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
    tableName: 't_hrms_tenant',
    timestamps: true,
    createdAt: 'createTime',
    updatedAt: 'updateTime'
});

module.exports = Menu;