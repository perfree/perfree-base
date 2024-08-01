package com.perfree.mapper;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.perfree.commons.common.PageResult;
import com.perfree.commons.mapper.BaseMapperX;
import com.perfree.controller.auth.dictData.vo.*;
import com.perfree.model.DictData;
import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.annotations.*;
import com.perfree.commons.utils.DateTimeUtils;

import java.util.List;
import java.util.Objects;




/**
* @description 数据字典值
* @author Perfree
*/
@Mapper
public interface DictDataMapper extends BaseMapperX<DictData> {

    default PageResult<DictData> selectPage(DictDataPageReqVO reqVO) {
        LambdaQueryWrapper<DictData> lambdaQueryWrapper = new LambdaQueryWrapper<>();
        lambdaQueryWrapper.like(StringUtils.isNotBlank(reqVO.getDictLabel()), DictData::getDictLabel, reqVO.getDictLabel());
        lambdaQueryWrapper.like(StringUtils.isNotBlank(reqVO.getDictType()), DictData::getDictType, reqVO.getDictType());
        lambdaQueryWrapper.eq(StringUtils.isNotBlank(reqVO.getParentDictType()), DictData::getParentDictType, reqVO.getParentDictType());
        lambdaQueryWrapper.orderByAsc(DictData::getSeq);
        return selectPage(reqVO, lambdaQueryWrapper);
    }

    default List<DictData> listAll() {
        return selectList(new LambdaQueryWrapper<DictData>()
            .orderByDesc(DictData::getId)
        );
    }

    default List<DictData> queryByParentDictType(String parentDictType){
        return selectList(new LambdaQueryWrapper<DictData>()
                .eq(DictData::getParentDictType, parentDictType)
                .orderByAsc(DictData::getSeq)
        );
    }

    default DictData queryByDictType(String dictType){
        return selectOne(new LambdaQueryWrapper<DictData>().eq(DictData::getDictType, dictType));
    }
}