package com.perfree.convert.role;


import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.role.vo.RoleAddOrUpdateReqVO;
import com.perfree.controller.auth.role.vo.RoleRespVO;
import com.perfree.model.Role;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface RoleConvert {
    RoleConvert INSTANCE = Mappers.getMapper(RoleConvert.class);

    RoleRespVO convertRespVO(Role role);

    PageResult<RoleRespVO> convertPageResultVO(PageResult<Role> rolePageResult);

    Role convertAddOrUpdate(RoleAddOrUpdateReqVO roleAddOrUpdateReqVO);

    List<RoleRespVO> convertRespListVO(List<Role> list);

}
