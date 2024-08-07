package com.perfree.controller.auth.mailTemplate.vo;

import com.alibaba.excel.annotation.*;
import com.alibaba.excel.annotation.format.*;
import com.perfree.commons.excel.*;
import com.perfree.constant.UserConstant;
import com.perfree.controller.auth.mailServer.excelConvert.MailEnumExcelConvert;
import lombok.*;

import java.time.LocalDateTime;

@Data
public class MailTemplateExcelVO {

    @ExcelProperty("模板名称")
    private String name;

    @ExcelProperty("模板编码")
    private String code;

    @ExcelProperty("发送人名称")
    private String nickname;

    @ExcelProperty("邮件标题")
    private String mailTitle;

    @ExcelProperty("邮件内容")
    private String mailContent;

    @ExcelProperty(value = "状态", converter = MailEnumExcelConvert.class)
    private Integer status;

    @ExcelProperty("备注")
    private String remark;

    @ExcelProperty("创建时间")
    @DateTimeFormat("yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createTime;
}
