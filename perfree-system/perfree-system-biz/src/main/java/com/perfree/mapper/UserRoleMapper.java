package com.perfree.mapper;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.perfree.commons.mapper.BaseMapperX;
import com.perfree.model.UserRole;
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
public interface UserRoleMapper extends BaseMapperX<UserRole> {


    default void deleteByUserId(Integer userId){
        delete(new LambdaQueryWrapper<UserRole>().eq(UserRole::getUserId, userId));
    }

    default List<UserRole> getByUserId(Integer userId){
        return selectList(new LambdaQueryWrapper<UserRole>().eq(UserRole::getUserId, userId));
    }

}
