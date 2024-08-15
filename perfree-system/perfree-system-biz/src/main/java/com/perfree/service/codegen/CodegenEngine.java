package com.perfree.service.codegen;

import org.dromara.hutool.core.io.file.FileUtil;
import org.dromara.hutool.core.map.MapUtil;
import org.dromara.hutool.core.text.StrUtil;
import org.dromara.hutool.extra.template.TemplateConfig;
import org.dromara.hutool.extra.template.engine.TemplateEngine;
import org.dromara.hutool.extra.template.engine.velocity.VelocityEngine;
import com.google.common.collect.Sets;
import com.perfree.commons.common.UUIDTool;
import com.perfree.commons.constant.SystemConstants;
import com.perfree.constant.CodegenConstant;
import com.perfree.model.CodegenColumn;
import com.perfree.model.CodegenTable;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.io.File;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class CodegenEngine {

    private static final Map<String, String> BASE_SERVER_TEMPLATES = MapUtil.<String, String>builder(new LinkedHashMap<>())
            // controller
            .put("codegen/java/controller/Controller.vm", "${baseDir}/${moduleName}-biz/src/main/java/${packagePath}/controller/auth/${lowerFirstClassName}/${className}Controller.java")

            // model
            .put("codegen/java/model/Model.vm", "${baseDir}/${moduleName}-biz/src/main/java/${packagePath}/model/${className}.java")

            // mapper
            .put("codegen/java/mapper/Mapper.vm", "${baseDir}/${moduleName}-biz/src/main/java/${packagePath}/mapper/${className}Mapper.java")

            // service
            .put("codegen/java/service/Service.vm", "${baseDir}/${moduleName}-biz/src/main/java/${packagePath}/service/${lowerFirstClassName}/${className}Service.java")
            .put("codegen/java/service/ServiceImpl.vm", "${baseDir}/${moduleName}-biz/src/main/java/${packagePath}/service/${lowerFirstClassName}/${className}ServiceImpl.java")

            // VO
            .put("codegen/java/controller/vo/BaseVO.vm", "${baseDir}/${moduleName}-biz/src/main/java/${packagePath}/controller/auth/${lowerFirstClassName}/vo/${className}BaseVO.java")
            .put("codegen/java/controller/vo/RespVO.vm", "${baseDir}/${moduleName}-biz/src/main/java/${packagePath}/controller/auth/${lowerFirstClassName}/vo/${className}RespVO.java")
            .put("codegen/java/controller/vo/PageReqVO.vm", "${baseDir}/${moduleName}-biz/src/main/java/${packagePath}/controller/auth/${lowerFirstClassName}/vo/${className}PageReqVO.java")
            .put("codegen/java/controller/vo/AddReqVO.vm", "${baseDir}/${moduleName}-biz/src/main/java/${packagePath}/controller/auth/${lowerFirstClassName}/vo/${className}AddReqVO.java")
            .put("codegen/java/controller/vo/UpdateReqVO.vm", "${baseDir}/${moduleName}-biz/src/main/java/${packagePath}/controller/auth/${lowerFirstClassName}/vo/${className}UpdateReqVO.java")
            .put("codegen/java/controller/vo/ExcelVO.vm", "${baseDir}/${moduleName}-biz/src/main/java/${packagePath}/controller/auth/${lowerFirstClassName}/vo/${className}ExcelVO.java")
            .put("codegen/java/controller/vo/ExportReqVO.vm", "${baseDir}/${moduleName}-biz/src/main/java/${packagePath}/controller/auth/${lowerFirstClassName}/vo/${className}ExportReqVO.java")

            // convert
            .put("codegen/java/convert/Convert.vm", "${baseDir}/${moduleName}-biz/src/main/java/${packagePath}/convert/${lowerFirstClassName}/${className}Convert.java")

            // mapper xml
            .put("codegen/java/mapper/MapperXml.vm", "${baseDir}/${moduleName}-biz/src/main/resources/mapper/${className}Mapper.xml")

            // sql
            .put("codegen/sql/sql.vm", "${baseDir}/sql/sql.sql")
            .build();
    private static final Map<String, String> BASE_VUE_TEMPLATES = MapUtil.<String, String>builder(new LinkedHashMap<>())
            .put("codegen/vue/index.js.vm", "${baseDir}/perfree-ui-base/src/modules/${frontModuleName}/index.js")
            .put("codegen/vue/api.js.vm", "${baseDir}/perfree-ui-base/src/modules/${frontModuleName}/api/${lowerFirstClassName}.js")
            .put("codegen/vue/View.vue.vm", "${baseDir}/perfree-ui-base/src/modules/${frontModuleName}/view/${className}View.vue")
            .build();


    private static final Map<String, String> PLUGIN_SERVER_TEMPLATES = MapUtil.<String, String>builder(new LinkedHashMap<>())
            // controller
            .put("codegen/java/controller/Controller.vm", "${baseDir}/${pluginId}/src/main/java/${packagePath}/controller/auth/${lowerFirstClassName}/${className}Controller.java")

            // model
            .put("codegen/java/model/Model.vm", "${baseDir}/${pluginId}/src/main/java/${packagePath}/model/${className}.java")

            // mapper
            .put("codegen/java/mapper/Mapper.vm", "${baseDir}/${pluginId}/src/main/java/${packagePath}/mapper/${className}Mapper.java")

            // service
            .put("codegen/java/service/Service.vm", "${baseDir}/${pluginId}/src/main/java/${packagePath}/service/${lowerFirstClassName}/${className}Service.java")
            .put("codegen/java/service/ServiceImpl.vm", "${baseDir}/${pluginId}/src/main/java/${packagePath}/service/${lowerFirstClassName}/${className}ServiceImpl.java")

            // VO
            .put("codegen/java/controller/vo/BaseVO.vm", "${baseDir}/${pluginId}/src/main/java/${packagePath}/controller/auth/${lowerFirstClassName}/vo/${className}BaseVO.java")
            .put("codegen/java/controller/vo/RespVO.vm", "${baseDir}/${pluginId}/src/main/java/${packagePath}/controller/auth/${lowerFirstClassName}/vo/${className}RespVO.java")
            .put("codegen/java/controller/vo/PageReqVO.vm", "${baseDir}/${pluginId}/src/main/java/${packagePath}/controller/auth/${lowerFirstClassName}/vo/${className}PageReqVO.java")
            .put("codegen/java/controller/vo/AddReqVO.vm", "${baseDir}/${pluginId}/src/main/java/${packagePath}/controller/auth/${lowerFirstClassName}/vo/${className}AddReqVO.java")
            .put("codegen/java/controller/vo/UpdateReqVO.vm", "${baseDir}/${pluginId}/src/main/java/${packagePath}/controller/auth/${lowerFirstClassName}/vo/${className}UpdateReqVO.java")
            .put("codegen/java/controller/vo/ExcelVO.vm", "${baseDir}/${pluginId}/src/main/java/${packagePath}/controller/auth/${lowerFirstClassName}/vo/${className}ExcelVO.java")
            .put("codegen/java/controller/vo/ExportReqVO.vm", "${baseDir}/${pluginId}/src/main/java/${packagePath}/controller/auth/${lowerFirstClassName}/vo/${className}ExportReqVO.java")

            // convert
            .put("codegen/java/convert/Convert.vm", "${baseDir}/${pluginId}/src/main/java/${packagePath}/convert/${lowerFirstClassName}/${className}Convert.java")

            // mapper xml
            .put("codegen/java/mapper/MapperXml.vm", "${baseDir}/${pluginId}/src/main/resources/${mapperLocation}/${className}Mapper.xml")

            // sql
            .put("codegen/sql/sql.vm", "${baseDir}/${pluginId}/src/main/resources/sql/install-${lowerFirstClassName}.sql")
            .build();
    private static final Map<String, String> PLUGIN_VUE_TEMPLATES = MapUtil.<String, String>builder(new LinkedHashMap<>())
            .put("codegen/vue/index.js.vm", "${baseDir}/${pluginId}/ui/src/modules/${frontModuleName}/index.js")
            .put("codegen/vue/api.js.vm", "${baseDir}/${pluginId}/ui/src/modules/${frontModuleName}/api/${lowerFirstClassName}.js")
            .put("codegen/vue/View.vue.vm", "${baseDir}/${pluginId}/ui/src/modules/${frontModuleName}/view/${className}View.vue")
            .build();
    private static final Set<String> BASE_MODEL_FIELDS =  Sets.newHashSet("createUserId", "updateUserId", "createTime", "updateTime");

    private final TemplateEngine templateEngine;
    public CodegenEngine() {
        // 初始化 TemplateEngine 属性
        TemplateConfig config = new TemplateConfig();
        config.setResourceMode(TemplateConfig.ResourceMode.CLASSPATH);
        this.templateEngine = new VelocityEngine(config);
    }

    public File genCode(CodegenTable codegenTable, List<CodegenColumn> codegenColumnList) {
        File baseDir = new File(SystemConstants.UPLOAD_TEMP_PATH + File.separator + codegenTable.getTableName());
        if (baseDir.exists()) {
            FileUtil.clean(baseDir.getAbsolutePath());
        }
        Map<String, Object> contextMap = new HashMap<>();
        contextMap.put("table", handleTableContext(codegenTable, codegenColumnList));
        contextMap.put("columnList",  codegenColumnList.stream()
                .sorted(Comparator.comparing(CodegenColumn::getPrimaryKey, Comparator.comparing(s -> !s)))
                .collect(Collectors.toList()));
        contextMap.put("baseModelFields", BASE_MODEL_FIELDS);
        contextMap.put("uuidTool", new UUIDTool());
        // 后台代码
        if (codegenTable.getScene().equals(CodegenConstant.SCENE_ADMIN)) {
            for (String key : BASE_SERVER_TEMPLATES.keySet()) {
                String render = templateEngine.getTemplate(key).render(contextMap);
                FileUtil.writeString(render, new File(formatOutPath(baseDir, BASE_SERVER_TEMPLATES.get(key), codegenTable)), StandardCharsets.UTF_8);
            }

            for (String key : BASE_VUE_TEMPLATES.keySet()) {
                String render = templateEngine.getTemplate(key).render(contextMap);
                FileUtil.writeString(render, new File(formatOutPath(baseDir, BASE_VUE_TEMPLATES.get(key), codegenTable)), StandardCharsets.UTF_8);
            }
        } else {
            // 插件代码
            for (String key : PLUGIN_SERVER_TEMPLATES.keySet()) {
                String render = templateEngine.getTemplate(key).render(contextMap);
                FileUtil.writeString(render, new File(formatOutPath(baseDir, PLUGIN_SERVER_TEMPLATES.get(key), codegenTable)), StandardCharsets.UTF_8);
            }

            for (String key : PLUGIN_VUE_TEMPLATES.keySet()) {
                String render = templateEngine.getTemplate(key).render(contextMap);
                FileUtil.writeString(render, new File(formatOutPath(baseDir, PLUGIN_VUE_TEMPLATES.get(key), codegenTable)), StandardCharsets.UTF_8);
            }
        }
        return baseDir;
    }

    private HashMap<String, Object> handleTableContext(CodegenTable codegenTable, List<CodegenColumn> codegenColumnList) {
        HashMap<String, Object> result = new HashMap<>();
        result.put("className", codegenTable.getClassName());
        result.put("tableName", codegenTable.getTableName());
        result.put("comment", codegenTable.getClassComment());
        result.put("author", codegenTable.getAuthor());
        result.put("pluginId", codegenTable.getModuleName());
        result.put("scene", codegenTable.getScene());
        result.put("moduleName", codegenTable.getModuleName());
        result.put("frontModuleName", codegenTable.getFrontModuleName());
        result.put("packageName", codegenTable.getPackageName());
        result.put("parentMenuId", codegenTable.getParentMenuId());
        result.put("lowerFirstClassName", StrUtil.lowerFirst(codegenTable.getClassName()));
        String primaryColumn = "id";
        String primaryColumnType = "Integer";
        String upperFirstPrimaryColumn = "Id";
        CodegenColumn codegenColumn = codegenColumnList.stream().filter(CodegenColumn::getPrimaryKey).findFirst().orElse(null);
        if (null != codegenColumn) {
            primaryColumn = codegenColumn.getJavaField();
            primaryColumnType = codegenColumn.getJavaType();
            upperFirstPrimaryColumn = StrUtil.upperFirst(codegenColumn.getJavaField());
        }
        result.put("primaryColumn", primaryColumn);
        result.put("primaryColumnType", primaryColumnType);
        result.put("upperFirstPrimaryColumn", upperFirstPrimaryColumn);
        return result;
    }

    private String formatOutPath(File baseDir, String filePath, CodegenTable codegenTable) {
        filePath = StrUtil.replace(filePath, "${baseDir}", baseDir.getAbsolutePath());
        filePath = StrUtil.replace(filePath, "${moduleName}", codegenTable.getModuleName());
        filePath = StrUtil.replace(filePath, "${packagePath}", codegenTable.getPackageName().replaceAll("\\.", "/"));
        filePath = StrUtil.replace(filePath, "${className}", codegenTable.getClassName());
        filePath = StrUtil.replace(filePath, "${lowerFirstClassName}",  StrUtil.lowerFirst(codegenTable.getClassName()));
        filePath = StrUtil.replace(filePath, "${frontModuleName}",  codegenTable.getFrontModuleName());
        filePath = StrUtil.replace(filePath, "${pluginId}",  codegenTable.getModuleName());
        String mapperLocation = codegenTable.getMapperLocation();
        if (StringUtils.isBlank(mapperLocation)) {
            mapperLocation = CodegenConstant.DEFAULT_MAPPER_LOCATION;
        }
        filePath = StrUtil.replace(filePath, "${mapperLocation}",  mapperLocation);
        return filePath;
    }

    /**
     * 生成基础字段信息
     * @param codegenColumn codegenColumn
     */
    public void genBaseColumnInfo(CodegenColumn codegenColumn) {
        // 处理表单控件及查询类型
        if (codegenColumn.getJavaType().equals("LocalDateTime") || codegenColumn.getJavaType().equals("Date") ){
            codegenColumn.setFormType(CodegenConstant.FORM_TYPE_DATE);
            codegenColumn.setQueryType(CodegenConstant.QUERY_TYPE_BETWEEN);
        } else {
            codegenColumn.setFormType(CodegenConstant.FORM_TYPE_INPUT);
            if (codegenColumn.getJavaType().equals("Long") || codegenColumn.getJavaType().equals("Integer")
                    || codegenColumn.getJavaType().equals("Double") || codegenColumn.getJavaType().equals("BigDecimal")) {
                codegenColumn.setQueryType(CodegenConstant.QUERY_TYPE_EQ);
            } else {
                codegenColumn.setQueryType(CodegenConstant.QUERY_TYPE_LIKE);
            }
        }

        // 处理插入的字段
        if (!BASE_MODEL_FIELDS.contains(codegenColumn.getJavaField()) && !codegenColumn.getPrimaryKey()) {
            codegenColumn.setInsertOperation(true);
        }

        // 处理更新的字段
        if (!BASE_MODEL_FIELDS.contains(codegenColumn.getJavaField())) {
            codegenColumn.setUpdateOperation(true);
        }

        // 处理列表展示字段
        if ((!BASE_MODEL_FIELDS.contains(codegenColumn.getJavaField()) && !codegenColumn.getPrimaryKey()) || codegenColumn.getJavaField().equals("createTime")) {
            codegenColumn.setListOperation(true);
        }

        // 处理查询字段
        if (!BASE_MODEL_FIELDS.contains(codegenColumn.getJavaField()) && !codegenColumn.getPrimaryKey()) {
            codegenColumn.setListQueryOperation(true);
        }
    }
}
