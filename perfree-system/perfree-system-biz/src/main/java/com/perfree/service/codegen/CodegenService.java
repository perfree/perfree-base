package com.perfree.service.codegen;

import com.baomidou.mybatisplus.generator.config.po.TableInfo;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.codegen.vo.*;
import com.perfree.controller.auth.codegen.vo.table.CodegenTableListReqVO;
import com.perfree.controller.auth.codegen.vo.table.CodegenTablePageReqVO;
import com.perfree.model.CodegenTable;

import java.util.List;

public interface CodegenService {
    List<TableInfo> getTableList(CodegenTableListReqVO codegenTableListReqVO);

    void createCodegenList(CodegenCreateListReqVO reqVO);

    PageResult<CodegenTable> codegenTablePage(CodegenTablePageReqVO pageVO);

    CodegenInfoRespVO getCodegenInfoByTableId(Integer tableId);

    Boolean saveConfig(CodegenInfoReqVO codegenInfoReqVO);

    List<CodegenFileListRespVO> getCodeFileList(Integer tableId);

    String getCodeFileContent(CodeFileContentReqVO codeFileContentReqVO);

    Boolean del(Integer id);

}
