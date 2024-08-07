package com.perfree.controller.auth.mailServer.vo;

import com.alibaba.excel.annotation.*;
import com.alibaba.excel.annotation.format.*;
import com.perfree.commons.excel.*;
import com.perfree.constant.UserConstant;
import com.perfree.controller.auth.mailServer.excelConvert.MailEnumExcelConvert;
import lombok.*;

import java.time.LocalDateTime;

@Data
public class MailServerExcelVO {

    @ExcelProperty("名称")
    private String name;

    @ExcelProperty("账号")
    private String account;

    @ExcelProperty("用户名")
    private String userName;

    @ExcelProperty("SMTP域名")
    private String address;

    @ExcelProperty("SMTP端口")
    private Integer port;

    @ExcelProperty(value = "状态", converter = MailEnumExcelConvert.class)
    private Integer status;

    @ExcelProperty(value = "是否开启SSL", converter = MailEnumExcelConvert.class)
    private Byte enableSSL;

    @ExcelProperty("创建时间")
    @DateTimeFormat("yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createTime;
}
