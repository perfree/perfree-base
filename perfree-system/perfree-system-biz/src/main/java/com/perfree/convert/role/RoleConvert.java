package com.perfree.convert.role;


import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.role.vo.RoleAddReqVO;
import com.perfree.controller.auth.role.vo.RoleRespVO;
import com.perfree.controller.auth.role.vo.RoleUpdateReqVO;
import com.perfree.model.Role;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface RoleConvert {
    RoleConvert INSTANCE = Mappers.getMapper(RoleConvert.class);

    RoleRespVO convertRespVO(Role role);

    /**
     *
     * @param rolePageResult rolePageResult
     * @return PageResult
     */
    PageResult<RoleRespVO> convertPageResultVO(PageResult<Role> rolePageResult);

    List<RoleRespVO> convertRespListVO(List<Role> list);

    Role convertAddReqVO(RoleAddReqVO roleAddReqVO);

    Role convertUpdateReqVO(RoleUpdateReqVO roleUpdateReqVO);

}
