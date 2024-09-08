const { Sequelize } = require('sequelize');

// 读取配置
const dialect = process.env.DB_DIALECT || 'mysql';
const host = process.env.DB_HOST || '192.168.1.103';
const port = process.env.DB_PORT || 3306;
const username = process.env.DB_USERNAME || 'root';
const password = process.env.DB_PASSWORD || '1234@qwerQWER';
const database = process.env.DB_DATABASE || 'hrms';

// 配置数据库
const sequelize = new Sequelize(database, username, password, {
    host: host,
    port: port,
    dialect: dialect
});

// 验证连接
sequelize.authenticate();

exports.sequelize = sequelize;