/**
 * 服务器配置
 * 
 * @author xuke
 * @date 2024/9/8
 */
const config = {
    host: process.env.SERVER_HOST || '0.0.0.0',
    port: process.env.SERVER_PORT || 8080
};

module.exports = config;