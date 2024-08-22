package com.perfree.mapper;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.perfree.commons.common.PageResult;
import com.perfree.commons.mapper.BaseMapperX;
import com.perfree.controller.auth.user.vo.UserExportReqVO;
import com.perfree.controller.auth.user.vo.UserPageReqVO;
import com.perfree.enums.UserStatusEnum;
import com.perfree.model.User;
import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author perfree
 * @since 2023-09-27
 */
@Mapper
public interface UserMapper extends BaseMapperX<User> {

    default User findByAccount(String account){
        return selectOne(new LambdaQueryWrapper<User>().eq(User::getAccount, account));
    }

    default PageResult<User> selectPage(UserPageReqVO pageVO) {
        return selectPage(pageVO, new LambdaQueryWrapper<User>()
                .like(StringUtils.isNotBlank(pageVO.getUserName()), User::getUserName, pageVO.getUserName())
                .like(StringUtils.isNotBlank(pageVO.getAccount()), User::getAccount, pageVO.getAccount())
                .orderByDesc(User::getId)
        );
    }

    default List<User> queryExportData(UserExportReqVO reqVO){
        return selectList(new LambdaQueryWrapper<User>()
                .like(StringUtils.isNotBlank(reqVO.getUserName()), User::getUserName, reqVO.getUserName())
                .like(StringUtils.isNotBlank(reqVO.getAccount()), User::getAccount, reqVO.getAccount())
                .orderByDesc(User::getId)
        );
    }

    default Long getTotalUser(){
        return selectCount(new LambdaQueryWrapper<User>().eq(User::getStatus, UserStatusEnum.ENABLE.getCode()));
    }

}
