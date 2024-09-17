/***** 租户管理相关 *****/

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

/***** 权限管理相关 *****/

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


/***** 组织管理相关 *****/

/** 组织类型表 **/
CREATE TABLE `t_hrms_organization_type` (
    `id` VARCHAR(64) NOT NULL COMMENT '主键ID',
    `tenant_id` VARCHAR(64) NOT NULL COMMENT '所属租户ID',
    `type_code` VARCHAR(32) NOT NULL COMMENT '类型编码',
    `type_name` VARCHAR(32) NOT NULL COMMENT '类型名称',
    `status` CHAR(2) NOT NULL COMMENT '状态',
    `order_num` INT DEFAULT NULL COMMENT '排序号',
    `create_time` TIMESTAMP NOT NULL COMMENT '创建时间',
    `update_time` TIMESTAMP NOT NULL COMMENT '更新时间',
    PRIMARY KEY (`id`),
    KEY `index_tenant_id` (`tenant_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT '组织类型表';

/** 组织表 **/
CREATE TABLE `t_hrms_organization` (
    `id` VARCHAR(64) NOT NULL COMMENT '主键ID',
    `tenant_id` VARCHAR(64) NOT NULL COMMENT '所属租户ID',
    `parent_id` VARCHAR(64) DEFAULT NULL COMMENT '上级组织ID',
    `organization_code` VARCHAR(32) NOT NULL COMMENT '组织编码',
    `organization_short_name` VARCHAR(64) DEFAULT NULL COMMENT '组织简称',
    `organization_full_name` VARCHAR(128) NOT NULL COMMENT '组织全称',
    `organization_type_id` VARCHAR(64) NOT NULL COMMENT '所属组织类型ID',
    `is_taxable_entity` CHAR(2) NOT NULL COMMENT '是否纳税主体',
    `usci` VARCHAR(21) NOT NULL COMMENT '统一社会信用代码',
    `found_date` DATE NOT NULL COMMENT '成立日期',
    `representative_id` VARCHAR(64) DEFAULT NULL COMMENT '单位负责人ID（或法人）',
    `representative_phone` VARCHAR(18) DEFAULT NULL COMMENT '单位负责人联系电话（或法人）',
    `registered_nation_id` VARCHAR(64) NOT NULL COMMENT '注册地-国家或地区ID',
    `registered_jurisdiction_id` VARCHAR(64) NOT NULL COMMENT '注册地-行政区划ID',
    `registered_address` VARCHAR(128) NOT NULL COMMENT '注册地-注册地址',
    `business_nation_id` VARCHAR(64) NOT NULL COMMENT '经营地-国家或地区ID',
    `business_jurisdiction_id` VARCHAR(64) DEFAULT NULL COMMENT '经营地-国家或地区ID',
    `business_address` VARCHAR(128) DEFAULT NULL COMMENT '经营地-营业地址',
    `status` CHAR(2) NOT NULL COMMENT '状态',
    `order_num` INT DEFAULT NULL COMMENT '排序号',
    `create_time` TIMESTAMP NOT NULL COMMENT '创建时间',
    `update_time` TIMESTAMP NOT NULL COMMENT '更新时间',
    PRIMARY KEY (`id`),
    KEY `index_tenant_id` (`tenant_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT '组织表';

/** 股东表 **/
CREATE TABLE `t_hrms_shareholder` (
    `id` VARCHAR(64) NOT NULL COMMENT '主键ID',
    `tenant_id` VARCHAR(64) NOT NULL COMMENT '所属租户ID',
    `held_organization_id` VARCHAR(64) NOT NULL COMMENT '被持有组织ID',
    `holder_organization_id` VARCHAR(64) NOT NULL COMMENT '持久组织ID',
    `shareholder_type_id` VARCHAR(64) NOT NULL COMMENT '所属股东类别ID',
    `holding_percentage` FLOAT NOT NULL COMMENT '持股比例',
    `order_num` INT NOT NULL COMMENT '排序号',
    `create_time` TIMESTAMP NOT NULL COMMENT '创建时间',
    `update_time` TIMESTAMP NOT NULL COMMENT '更新时间',
    PRIMARY KEY (`id`),
    KEY `index_tenant_id` (`tenant_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT '股东表';