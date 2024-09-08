const express = require('express');
require('express-async-errors');

const errorHandler = require('./middleware/error-handler');
const userRouter = require('./user/controller/user-controller');
const serverConfig = require('./config/server-config');
require('./config/db-config');

// 初始化应用
const app = express();

app.use(express.json());

// 配置路由
app.use('/users', userRouter);

// 统一异常处理
app.use(errorHandler);

// 启动应用
app.listen(serverConfig.port, serverConfig.host, () => {
    console.log(`hrms启动成功，正在监听${serverConfig.host}:${serverConfig.port}`);
});