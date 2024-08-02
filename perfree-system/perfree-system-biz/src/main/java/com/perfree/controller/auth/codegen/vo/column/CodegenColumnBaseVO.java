package com.perfree.controller.auth.codegen.vo.column;


import lombok.Data;

@Data
public class CodegenColumnBaseVO {

    private Integer tableId;

    private String columnName;

    private String dataType;

    private String columnComment;

    private Boolean nullable;

    private Boolean primaryKey;

    private Boolean autoIncrement;

    private String javaType;

    private String javaField;

    private Boolean insertOperation;

    private Boolean updateOperation;

    private Boolean listOperation;

    private Boolean listQueryOperation;

    private Integer formType;

    private Integer queryType;

    private String dictType;

}
