/** 用户信息表 **/
CREATE TABLE `t_hrms_user` (
    `id` VARCHAR(64) NOT NULL COMMENT '主键ID'，
    `tenant_id` VARCHAR(64) DEFAULT NULL COMMENT '所属租户ID',
    `dept_id` VARCHAR(64) DEFAULT NULL COMMENT '所属组织ID',
    `username` VARCHAR(32) NOT NULL COMMENT '用户名',
    `nickname` VARCHAR(32) NOT NULL COMMENT '用户昵称',
    `phone_number` VARCHAR(11) NOT NULL COMMENT '手机号码',
    `gender` CHAR(2) DEFAULT NULL COMMENT '性别',
    `password` VARCHAR(128) NOT NULL COMMENT '密码',
    `status` CHAR(2) NOT NULL COMMENT '状态',
    `create_time` TIMESTAMP NOT NULL COMMENT '创建时间',
    `update_time` TIMESTAMP NOT NULL COMMENT '更新时间',
    PRIMARY KEY (`id`),
    KEY `index_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT '用户信息表';

/** 租户信息表 **/
CREATE TABLE `t_hrms_tenant` (
    `id` VARCHAR(64) NOT NULL COMMENT '主键ID'，
    `tenant_name` VARCHAR(32) NOT NULL COMMENT '租户名称',
    `admin_id` VARCHAR(64) NOT NULL COMMENT '管理员ID',
    `status` CHAR(2) NOT NULL COMMENT '状态',
    `create_time` TIMESTAMP NOT NULL COMMENT '创建时间',
    `update_time` TIMESTAMP NOT NULL COMMENT '更新时间',
    PRIMARY KEY (`id`),
    KEY `unique_tenant_name` (`tenant_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT '租户信息表';

/** 租户订阅表 **/
CREATE TABLE `t_hrms_tenant_subscription` (
    `id` VARCHAR(64) NOT NULL COMMENT '主键ID',
    `tenant_id` VARCHAR(64) NOT NULL COMMENT '租户ID',
    `tenant_package_id` VARCHAR(64) NOT NULL COMMENT '租户套餐ID',
    `subscription_type` CHAR(2) NOT NULL COMMENT '订阅类型',
    `begin_time` TIMESTAMP NOT NULL COMMENT '起始时间',
    `end_time` TIMESTAMP NOT NULL COMMENT '结束时间',
    `user_count` INT NOT NULL COMMENT '用户数量',
    `status` CHAR(2) NOT NULL COMMENT '状态',
    `create_time` TIMESTAMP NOT NULL COMMENT '创建时间',
    `update_time` TIMESTAMP NOT NULL COMMENT '更新时间',
    PRIMARY KEY (`id`),
    KEY `index_tenant_id` (`tenant_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT '租户订阅表';

/** 租户套餐表 **/
CREATE TABLE `t_hrms_tenant_package` (
    `id` VARCHAR(64) NOT NULL COMMENT '主键ID',
    `package_name` VARCHAR(32) NOT NULL COMMENT '套餐名称',
    `description` VARCHAR(256) NOT NULL COMMENT '套餐描述',
    `status` CHAR(2) NOT NULL COMMENT '状态',
    `menuIds` JSON DEFAULT NULL COMMENT '关联菜单ID清单',
    `create_time` TIMESTAMP NOT NULL COMMENT '创建时间',
    `update_time` TIMESTAMP NOT NULL COMMENT '更新时间',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT '租户套餐表';

/** 菜单表 **/
CREATE TABLE `t_hrms_menu` (
    `id` VARCHAR(64) NOT NULL COMMENT '主键ID',
    `parent_id` VARCHAR(64) DEFAULT NULL COMMENT '父级菜单ID',
    `menu_name` VARCHAR(32) NOT NULL COMMENT '菜单名称',
    `menu_type` CHAR(2) NOT NULL COMMENT '菜单类型',
    `path` VARCHAR(64) DEFAULT NULL COMMENT '路由路径',
    `query` VARCHAR(128) DEFAULT NULL COMMENT '路由参数',
    `component` VARCHAR(64) DEFAULT NULL COMMENT '组件路径',
    `permissions` JSON DEFAULT NULL COMMENT '权限标识清单',
    `status` CHAR(2) NOT NULL COMMENT '状态',
    `order_num` INT DEFAULT NULL COMMENT '排序号',
    `create_time` TIMESTAMP NOT NULL COMMENT '创建时间',
    `update_time` TIMESTAMP NOT NULL COMMENT '更新时间',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT '菜单表';

/** 角色表 **/
CREATE TABLE `t_hrms_role` (
    `id` VARCHAR(64) NOT NULL COMMENT '主键ID',
    `role_name` VARCHAR(32) NOT NULL COMMENT '角色名称',
    `data_scope` CHAR(2) NOT NULL COMMENT '数据权限',
    `status` CHAR(2) NOT NULL COMMENT '状态',
    `order_num` INT DEFAULT NULL COMMENT '排序号',
    `create_time` TIMESTAMP NOT NULL COMMENT '创建时间',
    `update_time` TIMESTAMP NOT NULL COMMENT '更新时间',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT '角色表';

/** 角色菜单关联表 **/
CREATE TABLE `t_hrms_role_menu` (
    `id` VARCHAR(64) NOT NULL COMMENT '主键ID',
    `role_id` VARCHAR(64) NOT NULL COMMENT '角色ID',
    `menu_id` VARCHAR(64) NOT NULL COMMENT '菜单ID',
    `create_time` TIMESTAMP NOT NULL COMMENT '创建时间',
    `update_time` TIMESTAMP NOT NULL COMMENT '更新时间',
    PRIMARY KEY (`id`),
    KEY `index_role_id` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT '角色菜单关联表';