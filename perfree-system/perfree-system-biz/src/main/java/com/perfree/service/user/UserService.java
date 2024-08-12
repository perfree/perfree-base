package com.perfree.service.user;

import com.baomidou.mybatisplus.extension.service.IService;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.system.vo.LoginUserInfoRespVO;
import com.perfree.controller.auth.user.vo.*;
import com.perfree.controller.common.system.vo.LoginUserReqVO;
import com.perfree.controller.common.system.vo.LoginUserRespVO;
import com.perfree.controller.common.system.vo.RegisterUserReqVO;
import com.perfree.model.User;

import java.util.List;

/**
 * <p>
 * 服务类
 * </p>
 *
 * @author perfree
 * @since 2023-09-27
 */
public interface UserService extends IService<User> {

    /**
     * @param loginUserVO LoginUserReqVO
     * @return com.perfree.vo.LoginUserRespVO
     * @author Perfree
     * @description 账号密码登录
     * @date 15:42 2023/9/28
     */
    LoginUserRespVO login(LoginUserReqVO loginUserVO);

    /**
     * @param account 账号
     * @return com.perfree.model.User
     * @author Perfree
     * @description 根据账号查询用户信息
     * @date 15:42 2023/9/28
     */
    User findByAccount(String account);

    /**
     * 获取当前登录的用户信息
     *
     * @return LoginUserInfoRespVO
     */
    LoginUserInfoRespVO userInfo();

    /**
     * 用户分页列表
     *
     * @param pageVO pageVO
     * @return PageResult<User>
     */
    PageResult<User> userPage(UserPageReqVO pageVO);

    /**
     * 获取用户
     *
     * @param id id
     * @return User
     */
    User get(Integer id);

    /**
     * 删除用户
     *
     * @param id id
     * @return Boolean
     */
    Boolean del(Integer id);

    /**
     * 添加用户
     *
     * @param userAddReqVO userAddReqVO
     * @return User
     */
    User addUser(UserAddReqVO userAddReqVO);

    /**
     * 更新用户
     *
     * @param userUpdateReqVO userUpdateReqVO
     * @return User
     */
    User updateUser(UserUpdateReqVO userUpdateReqVO);

    /**
     * 获取用户角色id集合
     *
     * @param id id
     * @return UserRoleRespVO
     */
    UserRoleRespVO getUserRole(Integer id);

    /**
     * 设置用户角色
     *
     * @param userRoleReqVO userRoleReqVO
     * @return Boolean
     */
    Boolean updateUserRole(UserRoleReqVO userRoleReqVO);

    /**
     * 重置密码
     *
     * @param resetPasswordReqVO resetPasswordReqVO
     * @return Boolean
     */
    Boolean resetPassword(UserResetPasswordReqVO resetPasswordReqVO);

    /**
     * 查询要导出的数据
     *
     * @param exportReqVO exportReqVO
     * @return List<User>
     */
    List<User> queryExportData(UserExportReqVO exportReqVO);

    /**
     * 修改用户状态
     * @param userStatusReqVO userStatusReqVO
     * @return Boolean
     */
    Boolean updateStatus(UserStatusReqVO userStatusReqVO);

    /**
     * 修改头像
     * @param url url
     * @param id id
     */
    void updateUserAvatar(String url, Integer id);

    User updateProfile(UserProfileUpdateReqVO userProfileUpdateReqVO);

    Boolean updatePassword(UserUpdatePasswordReqVO userUpdatePasswordReqVO);

    /**
     * 注册账号
     * @param reqVO reqVO
     * @return User
     */
    User register(RegisterUserReqVO reqVO);

}
