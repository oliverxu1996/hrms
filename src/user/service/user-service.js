const _ = require('lodash');
const { Sequelize } = require('sequelize');

const validationUtils = require('../../utils/validation-utils');
const passwordUtils = require('../../utils/password-utils');
const keyUtils = require('../../utils/key-utils');
const paginationUtils = require('../../utils/pagination-utils');

const User = require('../model/user-model');

/**
 * 用户服务
 * 
 * @author xuke
 * @date 2024/9/2
 */
const userService = {

    /**
     * 保存用户
     */
    saveUser: async function(user) {
        // 参数校验
        if (_.isEmpty(user) || !_.isObject(user)) {
            throw new Error('用户为空，无法进行保存');
        }

        this.doParamValidation(user);

        // 组织存在性校验
        // TODO: ...

        // 用户名重复性校验
        if (!_.isEmpty(await this.queryByCondition({ username: user.username }))) {
            throw new Error('用户名已存在，无法进行保存');
        }

        // 手机号码重复性校验
        if (!_.isEmpty(await this.queryByCondition({ phoneNumber: user.phoneNumber }))) {
            throw new Error('手机号码已存在，无法进行保存');
        }

        // 密码校验
        validationUtils.checkBlank(user.password, '密码不能为空');
        passwordUtils.validateStrength(user.password);

        // 初始化参数
        user.id = keyUtils.generateUuid();
        user.password = await passwordUtils.hash(user.password);

        // 进行保存
        await User.create(user);
    },

    /**
     * 修改用户
     */
    modifyUser: async function(user) {
        // 参数校验
        if (_.isEmpty(user) || !_.isObject(user)) {
            throw new Error('用户为空，无法进行修改');
        }

        validationUtils.checkBlank(user.id, '未指定用户ID，无法进行修改');

        this.doParamValidation(user);

        // 存在性校验
        const sourceUser = await this.queryById(user.id);
        if (_.isEmpty(sourceUser)) {
            throw new Error('用户不存在，无法进行修改');
        }

        // 组织存在性校验
        // TODO: ...

        // 用户名校验
        if (sourceUser.username !== user.username) {
            throw new Error('用户名不允许进行修改');
        }

        // 手机号码重复性校验（如果修改）
        if (sourceUser.phoneNumber !== user.phoneNumber) {
            if (!_.isEmpty(await this.queryByCondition({ phoneNumber: user.phoneNumber }))) {
                throw new Error('手机号码已存在，无法进行修改');
            }
        }

        // 密码校验
        if (!_.isEmpty(user.password)) {
            throw new Error('密码不允许进行修改');
        }

        // 进行修改
        await User.update(user, {
            where: {
                id: user.id
            }
        });
    },

    /**
     * 删除用户 
     */
    removeUser: async function(id) {
        // 参数校验
        validationUtils.checkBlank(id, '未指定用户ID，无法进行删除');

        // 存在性校验
        const sourceUser = await this.queryById(id);
        if (_.isEmpty(sourceUser)) {
            throw new Error('用户不存在，无法进行删除');
        }

        // 进行删除
        await User.destroy({
            where: {
                id: sourceUser.id
            }
        });
    },

    /**
     * 重置用户密码
     */
    resetPassword: async function(id, password) {
        // 参数校验
        validationUtils.checkBlank(id, '未指定用户ID，无法重置用户密码');

        validationUtils.checkBlank(password, '密码不能为空');
        passwordUtils.validateStrength(password);

        // 存在性校验
        const sourceUser = await this.queryById(id);
        if (_.isEmpty(sourceUser)) {
            throw new Error('用户不存在，无法重置用户密码');
        }

        // 初始化参数
        const hashedPassword = await passwordUtils.hash(password);

        // 进行修改
        await User.update({
            password: hashedPassword
        }, {
            where: {
                id: sourceUser.id
            }
        });
    },

    /**
     * 条件查询用户 
     */
    queryByCondition: async function(condition, scope) {
        // 参数校验
        if (_.isEmpty(condition)) {
            throw new Error('未指定条件，无法进行查询');
        }

        // 组装查询条件
        const query = {
            where: {}
        };


        if (!_.isEmpty(condition.username)) {
            if (condition.username.startsWith('%') || condition.username.endsWith('%')) {
                query.where.username = {
                    [Sequelize.Op.like]: condition.username
                };
            } else {
                query.where.username = condition.username;
            }
        }

        if (!_.isEmpty(condition.nickname)) {
            if (condition.nickname.startsWith('%') || condition.nickname.endsWith('%')) {
                query.where.nickname = {
                    [Sequelize.Op.like]: condition.nickname
                };
            } else {
                query.where.nickname = condition.nickname
            }
        }

        if (!_.isEmpty(condition.phoneNumber)) {
            if (condition.phoneNumber.startsWith('%') || condition.phoneNumber.endsWith('%')) {
                query.where.phoneNumber = {
                    [Sequelize.Op.like]: condition.phoneNumber
                };
            } else {
                query.where.phoneNumber = condition.phoneNumber;
            }
        }

        if (!_.isEmpty(condition.gender)) {
            query.where.gender = condition.gender;
        }

        if (!_.isEmpty(condition.status)) {
            query.where.status = condition.status;
        }

        // 处理排序条件
        if (!_.isEmpty(condition.sortBy) && !_.isEmpty(condition.order)) {
            validationUtils.checkRange(condition.order, ['ASC', 'DESC'], '排序条件格式非法');
            query.order = [
                [condition.sortBy, condition.order]
            ];
        }

        // 处理查询范围
        if (_.isEmpty(scope)) {
            scope = 'withoutPassword'; // 默认排除密码
        }

        // 分页查询
        const pagination = paginationUtils.parseCondition(condition);
        if (!_.isEmpty(pagination)) {
            query.limit = pagination.limit;
            query.offset = pagination.offset;

            const result = await User.scope(scope).findAndCountAll(query);
            return {
                total: result.count,
                rows: result.rows
            };
        }

        // 普通查询
        return await User.scope(scope).findAll(query);
    },

    /**
     * ID查询用户 
     */
    queryById: async function(id, scope) {
        // 参数校验
        validationUtils.checkBlank(id, '未指定ID，无法查询用户');

        // 处理查询范围
        if (_.isEmpty(scope)) {
            scope = 'withoutPassword'; // 默认排除密码
        }

        // 查询用户
        return await User.scope(scope).findByPk(id);
    },

    /**
     * 参数校验
     */
    doParamValidation: function(user) {
        validationUtils.checkBlank(user.username, '用户名不能为空');
        validationUtils.checkBlank(user.nickname, '用户昵称不能为空');
        validationUtils.checkBlank(user.phoneNumber, '手机号码不能为空');
        
        validationUtils.checkBlank(user.gender, '性别不能为空');
        validationUtils.checkRange(user.gender, ['1', '2'], '性别格式非法');

        validationUtils.checkBlank(user.status, '状态不能为空');
        validationUtils.checkRange(user.status, ['0', '1'], '状态格式非法');
    }
};

module.exports = userService;