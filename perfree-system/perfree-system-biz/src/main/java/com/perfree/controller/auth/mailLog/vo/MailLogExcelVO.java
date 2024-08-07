package com.perfree.controller.auth.mailLog.vo;

import com.alibaba.excel.annotation.*;
import com.alibaba.excel.annotation.format.*;
import com.perfree.commons.excel.*;
import com.perfree.constant.UserConstant;
import lombok.*;

import java.time.LocalDateTime;
import java.time.LocalDateTime;

@Data
public class MailLogExcelVO {

    @ExcelProperty("模板编号")
    private String mailTemplateCode;

    @ExcelProperty("发送时间")
    @DateTimeFormat("yyyy-MM-dd HH:mm:ss")
    private LocalDateTime sendDate;

    @ExcelProperty("接收邮箱")
    private String receiveMail;

    @ExcelProperty("邮件标题")
    private String mailTitle;

    @ExcelProperty("发送状态")
    private Integer sendStatus;

    @ExcelProperty("发件邮箱")
    private String sendMail;

    @ExcelProperty("邮件内容")
    private String content;

    @ExcelProperty("创建时间")
    @DateTimeFormat("yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createTime;
}
