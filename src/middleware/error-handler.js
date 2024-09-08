/**
 * 统一异常处理器
 * 
 * @author xuke
 * @date 2024/9/7
 */
const errorHandler = (err, req, res, next) => {
    if (err) {
        return res.status(500).json({ code: 500, msg: err.toString() });
    }

    next();
};

module.exports = errorHandler;