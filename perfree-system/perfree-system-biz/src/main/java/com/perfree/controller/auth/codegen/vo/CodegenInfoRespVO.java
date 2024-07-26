package com.perfree.controller.auth.codegen.vo;


import com.perfree.controller.auth.codegen.vo.column.CodegenColumnRespVO;
import com.perfree.controller.auth.codegen.vo.table.CodegenTableRespVO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.ToString;

import java.util.List;

@Schema(description = "代码生成信息 Response VO")
@Data
@ToString(callSuper = true)
public class CodegenInfoRespVO {

    private CodegenTableRespVO codegenTable;

    private List<CodegenColumnRespVO> codegenColumnList;

}
