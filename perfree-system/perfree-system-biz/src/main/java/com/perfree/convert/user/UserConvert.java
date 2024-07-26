package com.perfree.convert.user;

import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.system.vo.LoginUserInfoRespVO;
import com.perfree.controller.auth.user.vo.UserAddReqVO;
import com.perfree.controller.auth.user.vo.UserRespVO;
import com.perfree.controller.auth.user.vo.UserUpdateReqVO;
import com.perfree.controller.common.system.vo.LoginUserReqVO;
import com.perfree.controller.common.system.vo.LoginUserRespVO;
import com.perfree.model.User;
import com.perfree.system.api.user.dto.UserRespDTO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

/**
 * @author Perfree
 * @description 定义UserConvert
 * @date 15:40 2023/9/28
 */
@Mapper(componentModel = "spring")
public interface UserConvert {

    UserConvert INSTANCE = Mappers.getMapper(UserConvert.class);

    User convert(LoginUserReqVO bean);

    LoginUserRespVO convert(User bean);

    List<LoginUserRespVO> convertList(List<User> list);

    LoginUserInfoRespVO convertLoginInfo(User loginUser);

    UserRespDTO convertDto(User byAccount);

    PageResult<UserRespVO> convertPageResultVO(PageResult<User> userPageResult);

    UserRespVO convertRespVO(User user);

    User convertAddVO(UserAddReqVO userAddReqVO);

    User convertUpdateVO(UserUpdateReqVO userUpdateReqVO);

}
