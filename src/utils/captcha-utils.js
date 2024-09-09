const canvas = require('canvas');

const keyUtils = require('./key-utils');

/**
 * 验证码工具
 * 
 * @author xuke
 * @date 2024/9/8
 */
const captchaUtils = {

    /**
     * 生成验证码
     */
    generateCaptcha: () => {
        // 生成随机UUID
        const uuid = keyUtils.generateUuid();

        // 生成随机文字
        const text = Math.random().toString(36).substring(2, 8);

        // 处理图片
        const captchaCanvas = canvas.createCanvas(200, 100);
        
        const captchaContext = captchaCanvas.getContext('2d');
        captchaContext.font = '30px Arial';
        captchaContext.fillText(text, 50, 50);

        const captchaBuffer = captchaCanvas.toDataURL();

        // 返回验证码
        return {
            uuid: uuid,
            text: text,
            buffer: captchaBuffer
        };
    }
};

module.exports = captchaUtils;