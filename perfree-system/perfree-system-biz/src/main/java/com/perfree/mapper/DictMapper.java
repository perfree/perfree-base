package com.perfree.mapper;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.perfree.commons.common.PageResult;
import com.perfree.commons.mapper.BaseMapperX;
import com.perfree.controller.auth.dict.vo.*;
import com.perfree.model.Dict;
import com.perfree.model.DictData;
import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.annotations.*;
import com.perfree.commons.utils.DateTimeUtils;

import java.util.List;
import java.util.Objects;




/**
* @description 数据字典
* @author Perfree
*/
@Mapper
public interface DictMapper extends BaseMapperX<Dict> {

    default PageResult<Dict> selectPage(DictPageReqVO reqVO) {
        LambdaQueryWrapper<Dict> lambdaQueryWrapper = new LambdaQueryWrapper<>();
        lambdaQueryWrapper.like(StringUtils.isNotBlank(reqVO.getDictType()), Dict::getDictType, reqVO.getDictType());
        lambdaQueryWrapper.like(StringUtils.isNotBlank(reqVO.getDictName()), Dict::getDictName, reqVO.getDictName());
        lambdaQueryWrapper.orderByAsc(Dict::getSeq);
        return selectPage(reqVO, lambdaQueryWrapper);
    }

    default List<Dict> listAll() {
        return selectList(new LambdaQueryWrapper<Dict>()
            .orderByDesc(Dict::getId)
        );
    }

    default List<Dict> queryListAll(String dictType, String dictName){
        return selectList(new LambdaQueryWrapper<Dict>()
                .like(StringUtils.isNotBlank(dictType), Dict::getDictType, dictType)
                .or()
                .like(StringUtils.isNotBlank(dictName), Dict::getDictName, dictName)
                .orderByDesc(Dict::getId)
        );
    }

    default Dict queryByDictType(String dictType){
        return selectOne(new LambdaQueryWrapper<Dict>().eq(Dict::getDictType, dictType));
    }
}