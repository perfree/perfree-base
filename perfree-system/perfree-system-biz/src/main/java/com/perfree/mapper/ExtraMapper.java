package com.perfree.mapper;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.perfree.commons.common.PageResult;
import com.perfree.commons.mapper.BaseMapperX;
import com.perfree.controller.auth.extra.vo.ExtraPageReqVO;
import com.perfree.model.Extra;
import com.perfree.model.Role;
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
public interface ExtraMapper extends BaseMapperX<Extra> {

    default Extra getByKey(String extraKey){
        return selectOne(new LambdaQueryWrapper<Extra>().eq(Extra::getExtraKey, extraKey));
    }

    default PageResult<Extra> selectExtraPage(ExtraPageReqVO pageVO){
        return selectPage(pageVO, new LambdaQueryWrapper<Extra>()
                .like(StringUtils.isNotBlank(pageVO.getExtraName()), Extra::getExtraName, pageVO.getExtraName())
                .orderByDesc(Extra::getId)
        );
    }

}
