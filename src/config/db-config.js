const { Sequelize } = require('sequelize');
const _ = require('lodash');

const contextUtils = require('../utils/context-utils');

// 读取配置
const dialect = process.env.DB_DIALECT;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;

// 启用上下文
Sequelize.useCLS(contextUtils.namespace);

// 配置数据库
const sequelize = new Sequelize(database, username, password, {
    host: host,
    port: port,
    dialect: dialect
});

// 配置多租户处理
const excludedModels = [
    'Tenant',
    'TenantSubscription',
    'TenantPackage'
];

sequelize.addHook('beforeCreate', (instance, options) => {
    if (_.includes(excludedModels, options.model.name)) {
        return;
    }

    const tenantId = contextUtils.get('tenantId');
    if (!_.isEmpty(tenantId)) {
        instance.tenantId = tenantId;
    }
});

sequelize.addHook('beforeUpdate', (instance, options) => {
    if (_.includes(excludedModels, options.model.name)) {
        return;
    }

    const tenantId = contextUtils.get('tenantId');
    if (!_.isEmpty(tenantId)) {
        options.where = { ...options.where, tenantId: tenantId };
    }
});

sequelize.addHook('beforeDestroy', (instance, options) => {
    if (_.includes(excludedModels, options.model.name)) {
        return;
    }

    const tenantId = contextUtils.get('tenantId');
    if (!_.isEmpty(tenantId)) {
        options.where = { ...options.where, tenantId: tenantId };
    }
});

sequelize.addHook('beforeFind', options => {
    const tenantId = contextUtils.get('tenantId');
    if (!_.isEmpty(tenantId)) {
        options.where = { ...options.where, tenantId: tenantId };
    }
});

// 验证连接
sequelize.authenticate();

exports.sequelize = sequelize;