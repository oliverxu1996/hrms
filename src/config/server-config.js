// 读取配置
const config = {
    host: process.SERVER_HOST || '0.0.0.0',
    port: process.SERVER_PORT || 8080
};

module.exports = config;