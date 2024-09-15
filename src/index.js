const express = require('express');
require('express-async-errors');
require('dotenv').config();

const serverConfig = require('./config/server-config');

require('./config/db-config');
require('./user/model/user-model');
require('./tenant/model/tenant-model');
require('./tenant/model/tenant-subscription-model');
require('./tenant/model/tenant-package-model');

const tokenVerifier = require('./middleware/token-verifier');
const tenantHandler = require('./middleware/tenant-handler');
const errorHandler = require('./middleware/error-handler');

const authRouter = require('./auth/controller/auth-controller');
const userRouter = require('./user/controller/user-controller');
const tenantRouter = require('./tenant/controller/tenant-controller');
const tenantPackageRouter = require('./tenant/controller/tenant-package-controller');
const menuRouter = require('./permission/controller/menu-controller');

// 初始化应用
const app = express();

// 配置前置处理
app.use(express.json());
app.use(tokenVerifier);
app.use(tenantHandler);

// 配置路由
app.use('/auths', authRouter);
app.use('/users', userRouter);
app.use('/tenants', tenantRouter);
app.use('/tenant-packages', tenantPackageRouter);
app.use('/menus', menuRouter);

// 配置后置处理
app.use(errorHandler);

// 启动应用
app.listen(serverConfig.port, serverConfig.host, () => {
    console.log(`hrms启动成功，正在监听${serverConfig.host}:${serverConfig.port}`);
});