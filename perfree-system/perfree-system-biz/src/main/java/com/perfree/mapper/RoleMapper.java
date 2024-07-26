package com.perfree.mapper;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.perfree.commons.common.PageResult;
import com.perfree.commons.mapper.BaseMapperX;
import com.perfree.controller.auth.role.vo.RolePageReqVO;
import com.perfree.model.Role;
import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

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
public interface RoleMapper extends BaseMapperX<Role> {

    default PageResult<Role> selectPage(RolePageReqVO pageVO) {
        return selectPage(pageVO, new LambdaQueryWrapper<Role>()
                .like(StringUtils.isNotBlank(pageVO.getName()), Role::getName, pageVO.getName())
        );
    }

    List<Role> getByUserId(@Param("userId") Integer userId);

}
