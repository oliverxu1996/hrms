const { Sequelize } = require('sequelize');

// 读取配置
const dialect = process.env.DB_DIALECT;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;

// 配置数据库
const sequelize = new Sequelize(database, username, password, {
    host: host,
    port: port,
    dialect: dialect
});

// 验证连接
sequelize.authenticate();

exports.sequelize = sequelize;