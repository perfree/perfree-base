package com.perfree.service.user;

import io.jsonwebtoken.Claims;
import org.dromara.hutool.core.data.id.IdUtil;
import org.dromara.hutool.crypto.digest.DigestUtil;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.perfree.cache.CaptchaCacheService;
import com.perfree.cache.OptionCacheService;
import com.perfree.commons.common.PageResult;
import com.perfree.commons.exception.ServiceException;
import com.perfree.commons.utils.WebUtils;
import com.perfree.constant.OptionConstant;
import com.perfree.constant.UserConstant;
import com.perfree.controller.auth.system.vo.LoginUserInfoRespVO;
import com.perfree.controller.auth.user.vo.*;
import com.perfree.controller.common.system.vo.LoginUserReqVO;
import com.perfree.controller.common.system.vo.LoginUserRespVO;
import com.perfree.controller.common.system.vo.RegisterUserReqVO;
import com.perfree.convert.user.UserConvert;
import com.perfree.enums.ErrorCode;
import com.perfree.enums.OptionEnum;
import com.perfree.enums.RoleEnum;
import com.perfree.mapper.RoleMapper;
import com.perfree.mapper.UserMapper;
import com.perfree.mapper.UserRoleMapper;
import com.perfree.model.Role;
import com.perfree.model.User;
import com.perfree.model.UserRole;
import com.perfree.security.SecurityConstants;
import com.perfree.security.SecurityFrameworkUtils;
import com.perfree.security.util.JwtUtil;
import com.perfree.security.vo.LoginUserVO;
import com.perfree.service.menu.MenuService;
import com.perfree.system.api.option.dto.OptionDTO;
import jakarta.annotation.Resource;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static com.perfree.enums.ErrorCode.ACCOUNT_EXIST;
import static com.perfree.enums.ErrorCode.USER_PASSWORD_NOT_EMPTY;

/**
 * <p>
 * 服务实现类
 * </p>
 *
 * @author perfree
 * @since 2023-09-27
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

    @Resource
    private UserMapper userMapper;

    @Resource
    private RoleMapper roleMapper;

    @Resource
    private UserRoleMapper userRoleMapper;

    @Resource
    private CaptchaCacheService captchaCacheService;

    @Resource
    private OptionCacheService optionCacheService;

    @Resource
    private MenuService menuService;

    @Override
    public LoginUserRespVO login(LoginUserReqVO loginUserVO) {
        validCaptcha(loginUserVO.getUuid(), loginUserVO.getCode());
        User user = userMapper.findByAccount(loginUserVO.getUsername());
        if (null == user) {
            throw new ServiceException(ErrorCode.ACCOUNT_NOT_FOUNT);
        }
        // 校验密码,PS: 为了兼容老数据,这里依然采用MD5 + Salt的方式
        String hexPassword = DigestUtil.md5Hex(user.getSalt() + loginUserVO.getPassword());
        if (!hexPassword.equals(user.getPassword())) {
            throw new ServiceException(ErrorCode.ACCOUNT_PASSWORD_ERROR);
        }
        // 生成Token
        String token = JwtUtil.generateToken(user.getAccount(), false);
        Date expirationDate = new Date(System.currentTimeMillis() + SecurityConstants.REFRESH_TOKEN_EXPIRATION_TIME * 1000);
        // 生成refreshToken
        String refreshToken = JwtUtil.getRefreshToken(user.getAccount(), expirationDate);
        // 组装返回信息
        LoginUserRespVO loginUserRespVO = new LoginUserRespVO();
        loginUserRespVO.setUserId(user.getId());
        loginUserRespVO.setAccessToken(token);
        loginUserRespVO.setRefreshToken(refreshToken);
        loginUserRespVO.setExpiresTime(expirationDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime());

        Authentication authentication = JwtUtil.getAuthentication(token);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        // 记录登录时间及IP
        user.setLoginIp(WebUtils.getClientIP());
        user.setLoginDate(LocalDateTime.now());
        userMapper.updateById(user);
        return loginUserRespVO;
    }

    @Override
    public User findByAccount(String account) {
        return userMapper.findByAccount(account);
    }

    @Override
    public LoginUserInfoRespVO userInfo() {
        LoginUserVO loginUser = SecurityFrameworkUtils.getLoginUser();
        assert loginUser != null;
        User user = userMapper.selectById(loginUser.getId());
        user.setPassword(null);
        user.setSalt(null);
        LoginUserInfoRespVO loginUserInfoRespVO = UserConvert.INSTANCE.convertLoginInfo(user);
        loginUserInfoRespVO.setAdmin(false);
        List<Role> roleList = roleMapper.getByUserId(loginUser.getId());
        for (Role role : roleList) {
            loginUserInfoRespVO.getRoles().add(role.getCode());
            if (role.getCode().equals(RoleEnum.ADMIN_CODE.getCode())) {
                loginUserInfoRespVO.setAdmin(true);
            }
        }
        List<String> permissionByUserId = menuService.getPermissionByUserId(loginUser.getId());
        loginUserInfoRespVO.setPermissions(permissionByUserId);
        return loginUserInfoRespVO;
    }

    @Override
    public PageResult<User> userPage(UserPageReqVO pageVO) {
        return userMapper.selectPage(pageVO);
    }

    @Override
    public User get(Integer id) {
        return userMapper.selectById(id);
    }

    @Override
    @Transactional
    public Boolean del(Integer id) {
        userRoleMapper.deleteByUserId(id);
        userMapper.deleteById(id);
        return true;
    }

    @Override
    @Transactional
    public User addUser(UserAddReqVO userAddReqVO) {
        User user = UserConvert.INSTANCE.convertAddVO(userAddReqVO);
        if (StringUtils.isBlank(userAddReqVO.getPassword())) {
            throw new ServiceException(USER_PASSWORD_NOT_EMPTY);
        }
        User byAccount = userMapper.findByAccount(userAddReqVO.getAccount());
        if (null != byAccount) {
            throw new ServiceException(ACCOUNT_EXIST);
        }

        if (StringUtils.isBlank(user.getAvatar())) {
            user.setAvatar(UserConstant.DEFAULT_AVATAR);
        }

        user.setSalt(IdUtil.simpleUUID());
        // PS: 为了兼容老数据,这里依然采用MD5 + Salt的方式
        String hexPassword = DigestUtil.md5Hex(user.getSalt() + userAddReqVO.getPassword());
        user.setPassword(hexPassword);
        userMapper.insert(user);
        return user;
    }

    @Override
    @Transactional
    public User updateUser(UserUpdateReqVO userUpdateReqVO) {
        User user = UserConvert.INSTANCE.convertUpdateVO(userUpdateReqVO);
        User byAccount = userMapper.findByAccount(userUpdateReqVO.getAccount());
        if (null != byAccount && !byAccount.getId().equals(user.getId())) {
            throw new ServiceException(ACCOUNT_EXIST);
        }
        if (StringUtils.isBlank(user.getAvatar())) {
            user.setAvatar(UserConstant.DEFAULT_AVATAR);
        }
        userMapper.updateById(user);
        return user;
    }

    @Override
    public UserRoleRespVO getUserRole(Integer id) {
        UserRoleRespVO userRoleRespVO = new UserRoleRespVO();
        List<UserRole> userRoleList = userRoleMapper.getByUserId(id);
        userRoleRespVO.setId(id);
        for (UserRole userRole : userRoleList) {
            userRoleRespVO.getRoles().add(userRole.getRoleId());
        }
        return userRoleRespVO;
    }

    @Override
    @Transactional
    public Boolean updateUserRole(UserRoleReqVO userRoleReqVO) {
        userRoleMapper.deleteByUserId(userRoleReqVO.getId());
        List<UserRole> userRoleList = new ArrayList<>();
        for (Integer role : userRoleReqVO.getRoles()) {
            UserRole userRole = new UserRole();
            userRole.setRoleId(role);
            userRole.setUserId(userRoleReqVO.getId());
            userRoleList.add(userRole);
        }
        userRoleMapper.insertBatch(userRoleList);
        return true;
    }

    @Override
    public Boolean resetPassword(UserResetPasswordReqVO resetPasswordReqVO) {
        if (StringUtils.isBlank(resetPasswordReqVO.getPassword())) {
            throw new ServiceException(USER_PASSWORD_NOT_EMPTY);
        }
        User user = userMapper.selectById(resetPasswordReqVO.getId());
        // PS: 为了兼容老数据,这里依然采用MD5 + Salt的方式
        String hexPassword = DigestUtil.md5Hex(user.getSalt() + resetPasswordReqVO.getPassword());
        user.setPassword(hexPassword);
        userMapper.updateById(user);
        return true;
    }

    @Override
    public List<User> queryExportData(UserExportReqVO exportReqVO) {
        return userMapper.queryExportData(exportReqVO);
    }

    @Override
    @Transactional
    public Boolean updateStatus(UserStatusReqVO userStatusReqVO) {
        User user = UserConvert.INSTANCE.convertByStatusReqVO(userStatusReqVO);
        userMapper.updateById(user);
        return true;
    }

    @Override
    @Transactional
    public void updateUserAvatar(String url, Integer id) {
        User user = new User();
        user.setAvatar(url);
        user.setId(id);
        userMapper.updateById(user);
    }

    @Override
    public User updateProfile(UserProfileUpdateReqVO userProfileUpdateReqVO) {
        User user = UserConvert.INSTANCE.convertByProfileReqVO(userProfileUpdateReqVO);
        LoginUserVO loginUser = SecurityFrameworkUtils.getLoginUser();
        if (null == loginUser) {
            throw new ServiceException(ErrorCode.USER_NOT_LOGIN);
        }
        user.setId(loginUser.getId());

        User byAccount = userMapper.findByAccount(userProfileUpdateReqVO.getAccount());
        if (null != byAccount && !byAccount.getId().equals(user.getId())) {
            throw new ServiceException(ACCOUNT_EXIST);
        }
        userMapper.updateById(user);
        return user;
    }

    @Override
    @Transactional
    public Boolean updatePassword(UserUpdatePasswordReqVO userUpdatePasswordReqVO) {
        LoginUserVO loginUser = SecurityFrameworkUtils.getLoginUser();
        if (null == loginUser) {
            throw new ServiceException(ErrorCode.USER_NOT_LOGIN);
        }
        User user = userMapper.selectById(loginUser.getId());
        String oldPass = DigestUtil.md5Hex(user.getSalt() + userUpdatePasswordReqVO.getOldPassword());
        if (!user.getPassword().equals(oldPass)) {
            throw new ServiceException(ErrorCode.OLD_PASSWORD_ERROR);
        }
        String newPass = DigestUtil.md5Hex(user.getSalt() + userUpdatePasswordReqVO.getNewPassword());
        user.setPassword(newPass);
        userMapper.updateById(user);
        return true;
    }

    @Override
    @Transactional
    public User register(RegisterUserReqVO reqVO) {
        validCaptcha(reqVO.getUuid(), reqVO.getCode());
        User user = UserConvert.INSTANCE.convertByRegisterVO(reqVO);
        if (StringUtils.isBlank(user.getPassword())) {
            throw new ServiceException(USER_PASSWORD_NOT_EMPTY);
        }
        User byAccount = userMapper.findByAccount(user.getAccount());
        if (null != byAccount) {
            throw new ServiceException(ACCOUNT_EXIST);
        }

        if (StringUtils.isBlank(user.getAvatar())) {
            user.setAvatar(UserConstant.DEFAULT_AVATAR);
        }

        user.setSalt(IdUtil.simpleUUID());
        // PS: 为了兼容老数据,这里依然采用MD5 + Salt的方式
        String hexPassword = DigestUtil.md5Hex(user.getSalt() + user.getPassword());
        user.setPassword(hexPassword);
        userMapper.insert(user);

        // 处理默认角色
        OptionDTO option = optionCacheService.getOption(OptionEnum.WEB_REGISTER_DEFAULT_ROLE.getKey());
        if (null != option && StringUtils.isNotBlank(option.getValue())) {
            UserRole userRole = new UserRole();
            userRole.setUserId(user.getId());
            userRole.setRoleId(Integer.valueOf(option.getValue()));
            userRoleMapper.insert(userRole);
        }
        return user;
    }

    @Override
    public LoginUserRespVO refreshToken(String refreshToken) {
        boolean verifyRefreshToken = JwtUtil.verifyRefreshToken(refreshToken);
        if (!verifyRefreshToken) {
            throw new ServiceException(ErrorCode.ACCOUNT_PASSWORD_ERROR);
        }
        Claims refreshTokenBody = JwtUtil.getRefreshTokenBody(refreshToken);
        String account = refreshTokenBody.getSubject();
        User user = userMapper.findByAccount(account);
        if (null == user) {
            throw new ServiceException(ErrorCode.ACCOUNT_NOT_FOUNT);
        }
        // 生成Token
        String token = JwtUtil.generateToken(user.getAccount(), false);
        LoginUserRespVO loginUserRespVO = new LoginUserRespVO();
        loginUserRespVO.setUserId(user.getId());
        loginUserRespVO.setRefreshToken(refreshToken);
        loginUserRespVO.setAccessToken(token);
        return loginUserRespVO;
    }

    @Override
    public Long getTotalUser() {
        return userMapper.getTotalUser();
    }


    /**
     * 校验验证码
     * @param uuid uuid
     * @param code code
     */
    private void validCaptcha(String uuid, String code){
        OptionDTO option = optionCacheService.getOption(OptionEnum.WEB_OPEN_CAPTCHA.getKey());
        if (null == option || option.getValue().equals(OptionConstant.OPTION_PUBLIC_TRUE)) {
            if (StringUtils.isBlank(uuid) || StringUtils.isBlank(code)) {
                throw new ServiceException(ErrorCode.CAPTCHA_IS_NOT_EMPTY);
            }
            String captcha = captchaCacheService.getCaptcha(uuid);
            if (StringUtils.isBlank(captcha)){
                throw new ServiceException(ErrorCode.CAPTCHA_EXPIRE);
            }
            captchaCacheService.removeCaptcha(uuid);
            if (!captcha.equals(code)) {
                throw new ServiceException(ErrorCode.CAPTCHA_VALID_ERROR);
            }
        }
    }
}
