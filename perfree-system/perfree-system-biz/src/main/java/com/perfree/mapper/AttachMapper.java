package com.perfree.mapper;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.perfree.commons.common.PageResult;
import com.perfree.commons.mapper.BaseMapperX;
import com.perfree.controller.auth.adminHome.vo.HomeStatisticRespVO;
import com.perfree.controller.auth.attach.vo.AttachPageReqVO;
import com.perfree.model.Attach;
import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.annotations.Mapper;

import java.util.HashMap;
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
public interface AttachMapper extends BaseMapperX<Attach> {

    /**
     * 分页查询
     * @param pageVO pageVO
     * @return PageResult<Attach>
     */
    default PageResult<Attach> selectPage(AttachPageReqVO pageVO) {
        return selectPage(pageVO, new LambdaQueryWrapper<Attach>()
                .like(StringUtils.isNotBlank(pageVO.getName()), Attach::getName, pageVO.getName())
                .eq(StringUtils.isNotBlank(pageVO.getAttachGroup()), Attach::getAttachGroup, pageVO.getAttachGroup())
                .eq(pageVO.getAttachConfigId() != null, Attach::getConfigId, pageVO.getAttachConfigId())
                .eq(pageVO.getStorage()!= null, Attach::getStorage, pageVO.getStorage())
                .eq(StringUtils.isNotBlank(pageVO.getType()), Attach::getType, pageVO.getType())
                .orderByDesc(Attach::getId)
        );
    }

    default List<Attach> getAllAttachGroup(){
        return selectList(new LambdaQueryWrapper<Attach>()
                .groupBy(Attach::getAttachGroup)
                .orderByDesc(Attach::getCreateTime));
    }

    HomeStatisticRespVO getTypeCount();

}
