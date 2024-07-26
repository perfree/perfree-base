package com.perfree.convert.codegen;


import com.baomidou.mybatisplus.generator.config.po.TableField;
import com.baomidou.mybatisplus.generator.config.po.TableInfo;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.codegen.vo.column.CodegenColumnReqVO;
import com.perfree.controller.auth.codegen.vo.column.CodegenColumnRespVO;
import com.perfree.controller.auth.codegen.vo.table.CodegenTableReqVO;
import com.perfree.controller.auth.codegen.vo.table.CodegenTableRespVO;
import com.perfree.model.CodegenColumn;
import com.perfree.model.CodegenTable;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CodegenConvert {
    CodegenConvert INSTANCE = Mappers.getMapper(CodegenConvert.class);

    @Mappings({
            @Mapping(source = "name", target = "tableName"),
            @Mapping(source = "comment", target = "tableComment"),
    })
    CodegenTable convertToCodegenTable(TableInfo tableInfo);

    PageResult<CodegenTableRespVO> convertPageResultVO(PageResult<CodegenTable> codegenTablePage);

    @Mappings({
            @Mapping(source = "name", target = "columnName"),
            @Mapping(source = "metaInfo.jdbcType", target = "dataType"),
            @Mapping(source = "comment", target = "columnComment"),
            @Mapping(source = "keyFlag", target = "primaryKey"),
            @Mapping(source = "keyIdentityFlag", target = "autoIncrement"),
            @Mapping(source = "metaInfo.nullable", target = "nullable"),
            @Mapping(source = "columnType.type", target = "javaType"),
            @Mapping(source = "propertyName", target = "javaField"),

    })
    CodegenColumn convertToCodegenColum(TableField field);

    CodegenTableRespVO ConvertToTableRespVO(CodegenTable codegenTable);

    List<CodegenColumnRespVO> ConvertToColumnListRespVO(List<CodegenColumn> codegenColumnList);

    CodegenTable convertByCodegenTableReqVO(CodegenTableReqVO codegenTable);

    CodegenColumn convertByCodegenColumnReqVO(CodegenColumnReqVO codegenColumnReqVO);

}
