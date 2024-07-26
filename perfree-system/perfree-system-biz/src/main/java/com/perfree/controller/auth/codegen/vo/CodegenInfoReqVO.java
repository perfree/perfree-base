package com.perfree.controller.auth.codegen.vo;


import com.perfree.controller.auth.codegen.vo.column.CodegenColumnReqVO;
import com.perfree.controller.auth.codegen.vo.table.CodegenTableReqVO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.ToString;

import java.util.List;

@Schema(description = "代码生成信息 req VO")
@Data
@ToString(callSuper = true)
public class CodegenInfoReqVO {

    private CodegenTableReqVO codegenTable;

    private List<CodegenColumnReqVO> codegenColumnList;

}
