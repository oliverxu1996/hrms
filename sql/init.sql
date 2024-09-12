/** 用户信息表 **/
CREATE TABLE `t_hrms_user` (
    `id` VARCHAR(64) NOT NULL COMMENT '主键ID'，
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
    `subscription_type` CHAR(2) NOT NULL COMMENT '订阅类型',
    `begin_time` TIMESTAMP NOT NULL COMMENT '起始时间',
    `end_time` TIMESTAMP NOT NULL COMMENT '结束时间',
    `status` CHAR(2) NOT NULL COMMENT '状态',
    `create_time` TIMESTAMP NOT NULL COMMENT '创建时间',
    `update_time` TIMESTAMP NOT NULL COMMENT '更新时间',
    PRIMARY KEY (`id`),
    KEY `index_tenant_id` (`tenant_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT '租户订阅表';