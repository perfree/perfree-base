package com.perfree.service.codegen;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.generator.config.DataSourceConfig;
import com.baomidou.mybatisplus.generator.config.GlobalConfig;
import com.baomidou.mybatisplus.generator.config.StrategyConfig;
import com.baomidou.mybatisplus.generator.config.builder.ConfigBuilder;
import com.baomidou.mybatisplus.generator.config.po.TableField;
import com.baomidou.mybatisplus.generator.config.po.TableInfo;
import com.baomidou.mybatisplus.generator.config.rules.DateType;
import com.perfree.commons.common.PageResult;
import com.perfree.commons.utils.SortingFieldUtils;
import com.perfree.constant.CodegenConstant;
import com.perfree.constant.MenuConstant;
import com.perfree.controller.auth.codegen.vo.CodegenCreateListReqVO;
import com.perfree.controller.auth.codegen.vo.CodegenInfoReqVO;
import com.perfree.controller.auth.codegen.vo.CodegenInfoRespVO;
import com.perfree.controller.auth.codegen.vo.column.CodegenColumnReqVO;
import com.perfree.controller.auth.codegen.vo.table.CodegenTableListReqVO;
import com.perfree.controller.auth.codegen.vo.table.CodegenTablePageReqVO;
import com.perfree.convert.codegen.CodegenConvert;
import com.perfree.mapper.CodegenColumnMapper;
import com.perfree.mapper.CodegenTableMapper;
import com.perfree.model.CodegenColumn;
import com.perfree.model.CodegenTable;
import jakarta.annotation.Resource;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class CodegenServiceImpl implements CodegenService{

    @Resource
    private DataSourceProperties dataSourceProperties;

    @Resource
    private CodegenTableMapper codegenTableMapper;

    @Resource
    private CodegenColumnMapper codegenColumnMapper;

    @Override
    public List<TableInfo> getTableList(CodegenTableListReqVO codegenTableListReqVO) {
        List<TableInfo> tableInfoList = getTableInfoListHandle(codegenTableListReqVO.getTableName());
        List<CodegenTable> existsTableList = codegenTableMapper.selectList();
        if (!existsTableList.isEmpty()) {
            Set<String> existsTables = existsTableList.stream().map(CodegenTable::getTableName).filter(Objects::nonNull).collect(Collectors.toSet());
            tableInfoList.removeIf(table -> existsTables.contains(table.getName()));
        }
        return tableInfoList;
    }

    @Override
    @Transactional
    public void createCodegenList(CodegenCreateListReqVO reqVO) {
        for (String tableName : reqVO.getTableNames()) {
            TableInfo tableInfo = getTableInfoHandle(tableName);
            CodegenTable codegenTable = CodegenConvert.INSTANCE.convertToCodegenTable(tableInfo);
            genBaseTableInfo(codegenTable);
            codegenTableMapper.insert(codegenTable);
            for (TableField field : tableInfo.getFields()) {
                CodegenColumn codegenColumn = CodegenConvert.INSTANCE.convertToCodegenColum(field);
                codegenColumn.setTableId(codegenTable.getId());
                genBaseColumnInfo(codegenColumn);
                codegenColumnMapper.insert(codegenColumn);
            }
        }
    }


    @Override
    public PageResult<CodegenTable> codegenTablePage(CodegenTablePageReqVO pageVO) {
        SortingFieldUtils.handleDefaultSortingField(pageVO);
        return codegenTableMapper.codegenTablePage(pageVO);
    }

    @Override
    public CodegenInfoRespVO getCodegenInfoByTableId(Integer tableId) {
        CodegenTable codegenTable = codegenTableMapper.selectById(tableId);
        List<CodegenColumn> codegenColumnList = codegenColumnMapper.selectByTableId(tableId);

        CodegenInfoRespVO codegenInfoRespVO = new CodegenInfoRespVO();
        codegenInfoRespVO.setCodegenTable(CodegenConvert.INSTANCE.ConvertToTableRespVO(codegenTable));
        codegenInfoRespVO.setCodegenColumnList(CodegenConvert.INSTANCE.ConvertToColumnListRespVO(codegenColumnList));
        return codegenInfoRespVO;
    }

    @Override
    @Transactional
    public Boolean saveConfig(CodegenInfoReqVO codegenInfoReqVO) {
        CodegenTable codegenTable = CodegenConvert.INSTANCE.convertByCodegenTableReqVO( codegenInfoReqVO.getCodegenTable());
        codegenTableMapper.updateById(codegenTable);
        List<CodegenColumn> batchUpdate = new ArrayList<>();
        for (CodegenColumnReqVO codegenColumnReqVO : codegenInfoReqVO.getCodegenColumnList()) {
            CodegenColumn codegenColumn = CodegenConvert.INSTANCE.convertByCodegenColumnReqVO(codegenColumnReqVO);
            batchUpdate.add(codegenColumn);
        }
        codegenColumnMapper.updateBatch(batchUpdate);
        return true;
    }

    /**
     * 生成填充基本表信息
     * @param codegenTable codegenTable
     */
    private void genBaseTableInfo(CodegenTable codegenTable) {
        codegenTable.setScene(CodegenConstant.SCENE_ADMIN);
        codegenTable.setClassName(StrUtil.toCamelCase(codegenTable.getTableName()));
        codegenTable.setModuleName(CodegenConstant.DEFAULT_MODULE_NAME);
        codegenTable.setClassComment(codegenTable.getTableComment());
        codegenTable.setParentMenuId(MenuConstant.ROOT_MENU_CODE);
    }

    /**
     * 生成基础字段信息
     * @param codegenColumn codegenColumn
     */
    private void genBaseColumnInfo(CodegenColumn codegenColumn) {
    }

    /**
     * 根据表明获取表信息处理逻辑
     * @param tableName tableName
     * @return TableInfo
     */
    private TableInfo getTableInfoHandle(String tableName) {
        return CollUtil.getFirst(getTableInfoListHandle(tableName));
    }


    /**
     * 获取数据库所有表处理逻辑
     * @param tableName 表名称
     * @return List<TableInfo>
     */
    private List<TableInfo> getTableInfoListHandle(String tableName) {
        // 使用 MyBatis Plus Generator 解析表结构
        DataSourceConfig dataSourceConfig = new DataSourceConfig.Builder(dataSourceProperties.getUrl(), dataSourceProperties.getUsername(),
                dataSourceProperties.getPassword()).build();
        StrategyConfig.Builder strategyConfig = new StrategyConfig.Builder();
        if (StrUtil.isNotEmpty(tableName)) {
            strategyConfig.addInclude(tableName);
        }
        GlobalConfig globalConfig = new GlobalConfig.Builder().dateType(DateType.TIME_PACK).build(); // 只使用 LocalDateTime 类型，不使用 LocalDate
        ConfigBuilder builder = new ConfigBuilder(null, dataSourceConfig, strategyConfig.build(),
                null, globalConfig, null);
        // 按照名字排序
        List<TableInfo> tables = builder.getTableInfoList();
        tables.sort(Comparator.comparing(TableInfo::getName));
        return tables;
    }
}
