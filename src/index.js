const express = require('express');
require('express-async-errors');

const serverConfig = require('./config/server-config');
require('./config/db-config');

const tokenVerifier = require('./middleware/token-verifier');
const errorHandler = require('./middleware/error-handler');

const authRouter = require('./auth/controller/auth-controller');
const userRouter = require('./user/controller/user-controller');

// 初始化应用
const app = express();

// 配置前置处理
app.use(express.json());
app.use(tokenVerifier);

// 配置路由
app.use('/auths', authRouter);
app.use('/users', userRouter);

// 配置后置处理
app.use(errorHandler);

// 启动应用
app.listen(serverConfig.port, serverConfig.host, () => {
    console.log(`hrms启动成功，正在监听${serverConfig.host}:${serverConfig.port}`);
});