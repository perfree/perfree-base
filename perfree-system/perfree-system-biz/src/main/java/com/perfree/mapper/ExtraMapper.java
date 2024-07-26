package com.perfree.mapper;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.perfree.commons.mapper.BaseMapperX;
import com.perfree.model.Extra;
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

}
