package com.perfree.controller.auth.codegen.vo;

import com.perfree.controller.auth.codegen.vo.column.CodegenColumnSaveReqVO;
import com.perfree.controller.auth.codegen.vo.table.CodegenTableSaveReqVO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.List;

@Schema(description = "保存代码生成配置 Request VO")
@Data
public class CodegenConfigSaveReqVO {

    private CodegenTableSaveReqVO codegenTableSaveReqVO;

    private List<CodegenColumnSaveReqVO> columnList;
}
