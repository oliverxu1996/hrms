const express = require('express');

const app = express();
const port = process.env.PORT || 8080;

// TODO ...

app.listen(port, () => {
    console.log(`hrms启动成功，正在监听端口${port}`);
});