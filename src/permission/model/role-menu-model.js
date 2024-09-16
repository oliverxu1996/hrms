const { DataTypes } = require('sequelize');

const { sequelize } = require('../../config/db-config');

/**
 * 角色菜单关联模型
 * 
 * @author xuke
 * @date 2024/9/16
 */
const RoleMenu = sequelize.define('RoleMenu', {

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
     * 角色ID
     */
    roleId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'role_id',
        comment: '角色ID'
    },

    /**
     * 菜单ID
     */
    menuId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'menu_id',
        comment: '菜单ID'
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
    tableName: 't_hrms_role_menu',
    timestamps: true,
    createdAt: 'createTime',
    updatedAt: 'updateTime'
});

module.exports = RoleMenu;