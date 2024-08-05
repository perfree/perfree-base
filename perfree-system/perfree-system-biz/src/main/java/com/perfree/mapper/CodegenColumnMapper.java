package com.perfree.mapper;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.perfree.commons.mapper.BaseMapperX;
import com.perfree.model.CodegenColumn;
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
public interface CodegenColumnMapper extends BaseMapperX<CodegenColumn> {


    default List<CodegenColumn> selectByTableId(Integer tableId){
        return selectList(new LambdaQueryWrapper<CodegenColumn>()
                .eq(CodegenColumn::getTableId, tableId)
                .orderByDesc(CodegenColumn::getCreateTime));
    }

    default void delByTableId(Integer tableId){
        delete(new LambdaQueryWrapper<CodegenColumn>().eq(CodegenColumn::getTableId, tableId));
    }

}
