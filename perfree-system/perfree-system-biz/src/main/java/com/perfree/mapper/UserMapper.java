package com.perfree.mapper;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.perfree.commons.common.PageResult;
import com.perfree.commons.mapper.BaseMapperX;
import com.perfree.controller.auth.user.vo.UserPageReqVO;
import com.perfree.model.User;
import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.annotations.Mapper;

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
        );
    }
}
