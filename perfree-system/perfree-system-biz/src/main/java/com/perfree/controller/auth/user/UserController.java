package com.perfree.controller.auth.user;

import com.perfree.commons.common.CommonResult;
import com.perfree.commons.common.PageResult;
import com.perfree.commons.excel.ExcelUtils;
import com.perfree.commons.exception.ServiceException;
import com.perfree.commons.utils.FileTypeUtils;
import com.perfree.constant.UserConstant;
import com.perfree.controller.auth.attach.vo.AttachUploadVO;
import com.perfree.controller.auth.user.vo.*;
import com.perfree.convert.user.UserConvert;
import com.perfree.demoModel.DemoMode;
import com.perfree.enums.ErrorCode;
import com.perfree.model.Attach;
import com.perfree.model.User;
import com.perfree.security.SecurityFrameworkUtils;
import com.perfree.security.vo.LoginUserVO;
import com.perfree.service.attach.AttachService;
import com.perfree.service.user.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.perfree.commons.common.CommonResult.success;

/**
 * @author Perfree
 * @version 1.0.0
 * @description 用户
 **/
@RestController
@Tag(name = "用户相关接口")
@RequestMapping("api/auth/user")
public class UserController {

    @Resource
    private UserService userService;

    @Resource
    private AttachService attachService;

    @PostMapping("/page")
    @Operation(summary = "用户分页列表")
    @PreAuthorize("@ss.hasPermission('admin:user:query')")
    public CommonResult<PageResult<UserRespVO>> page(@RequestBody UserPageReqVO pageVO) {
        PageResult<User> userPageResult = userService.userPage(pageVO);
        return success(UserConvert.INSTANCE.convertPageResultVO(userPageResult));
    }

    @GetMapping("/get")
    @Operation(summary = "获取用户")
    public CommonResult<UserRespVO> get(@RequestParam(value = "id") Integer id) {
        return success(UserConvert.INSTANCE.convertRespVO(userService.get(id)));
    }

    @PostMapping("/add")
    @Operation(summary = "添加")
    @DemoMode
    @PreAuthorize("@ss.hasPermission('admin:user:create')")
    public CommonResult<UserRespVO> add(@RequestBody @Valid UserAddReqVO userAddReqVO) {
        return success(UserConvert.INSTANCE.convertRespVO(userService.addUser(userAddReqVO)));
    }

    @PostMapping("/update")
    @Operation(summary = "更新")
    @DemoMode
    @PreAuthorize("@ss.hasPermission('admin:user:update')")
    public CommonResult<UserRespVO> update(@RequestBody @Valid UserUpdateReqVO userUpdateReqVO) {
        return success(UserConvert.INSTANCE.convertRespVO(userService.updateUser(userUpdateReqVO)));
    }

    @DeleteMapping("/del")
    @Operation(summary = "删除用户")
    @DemoMode
    @PreAuthorize("@ss.hasPermission('admin:user:delete')")
    public CommonResult<Boolean> del(@RequestParam(value = "id") Integer id) {
        return success(userService.del(id));
    }

    @PostMapping("/updateUserRole")
    @Operation(summary = "更新用户角色")
    @DemoMode
    @PreAuthorize("@ss.hasPermission('admin:user:configRole')")
    public CommonResult<Boolean> updateUserRole(@RequestBody @Valid UserRoleReqVO userRoleReqVO) {
        return success(userService.updateUserRole(userRoleReqVO));
    }

    @GetMapping("/getUserRole")
    @Operation(summary = "获取用户角色id集合")
    public CommonResult<UserRoleRespVO> getUserRole(@RequestParam(value = "id") Integer id) {
        return success(userService.getUserRole(id));
    }

    @PostMapping("/resetPassword")
    @Operation(summary = "重置密码")
    @DemoMode
    @PreAuthorize("@ss.hasPermission('admin:user:resetPassword')")
    public CommonResult<Boolean> resetPassword(@RequestBody @Valid UserResetPasswordReqVO resetPasswordReqVO) {
        return success(userService.resetPassword(resetPasswordReqVO));
    }

    @PostMapping("/export")
    @Operation(summary = "导出用户")
    @PreAuthorize("@ss.hasPermission('admin:user:export')")
    public void export(@RequestBody UserExportReqVO exportReqVO, HttpServletResponse response) {
        List<User> userList = userService.queryExportData(exportReqVO);
        ExcelUtils.renderExcel(response, UserConvert.INSTANCE.convertToExcelVOList(userList), UserExcelVO.class, "用户数据","用户数据.xlsx");
    }

    @PostMapping("/updateStatus")
    @Operation(summary = "修改状态")
    @DemoMode
    @PreAuthorize("@ss.hasPermission('admin:user:updateStatus')")
    public CommonResult<Boolean> updateStatus(@RequestBody UserStatusReqVO userStatusReqVO) {
        return success(userService.updateStatus(userStatusReqVO));
    }

    @PostMapping("/uploadAvatar")
    @Operation(summary = "修改头像")
    @PreAuthorize("@ss.hasPermission('admin:user:uploadAvatar')")
    public CommonResult<String> upload(AttachUploadVO attachUploadVO) {
        String contentType = attachUploadVO.getFile().getContentType();
        boolean isImage = FileTypeUtils.isImage(contentType);
        if (!isImage) {
            throw new ServiceException(ErrorCode.AVATAR_MUST_IMAGE);
        }
        LoginUserVO loginUser = SecurityFrameworkUtils.getLoginUser();
        if (null == loginUser) {
            throw new ServiceException(ErrorCode.USER_NOT_LOGIN);
        }
        attachUploadVO.setAttachGroup(UserConstant.DEFAULT_AVATAR_ATTACH_GROUP);
        Attach attach = attachService.create(attachUploadVO);
        userService.updateUserAvatar(attach.getUrl(), loginUser.getId());
        return success(attach.getUrl());
    }

    @PostMapping("/updateProfile")
    @Operation(summary = "修改个人信息")
    @DemoMode
    @PreAuthorize("@ss.hasPermission('admin:user:updateProfile')")
    public CommonResult<UserRespVO> updateProfile(@RequestBody @Valid UserProfileUpdateReqVO userProfileUpdateReqVO) {
        return success(UserConvert.INSTANCE.convertRespVO(userService.updateProfile(userProfileUpdateReqVO)));
    }

    @PostMapping("/updatePassword")
    @Operation(summary = "修改密码")
    @DemoMode
    @PreAuthorize("@ss.hasPermission('admin:user:updatePassword')")
    public CommonResult<Boolean> updatePassword(@RequestBody @Valid UserUpdatePasswordReqVO userUpdatePasswordReqVO) {
        return success(userService.updatePassword(userUpdatePasswordReqVO));
    }
}
