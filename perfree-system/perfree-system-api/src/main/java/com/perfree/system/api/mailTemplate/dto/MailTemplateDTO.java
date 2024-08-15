package com.perfree.system.api.mailTemplate.dto;


import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class MailTemplateDTO {

    /**
     * id
     */
    private Integer id;

    /**
     * 模板名称
     */
    private String name;

    /**
     * 模板编码
     */
    private String code;

    /**
     * 邮箱服务id
     */
    private Integer mailServerId;

    /**
     * 发送人名称
     */
    private String nickname;

    /**
     * 邮件标题
     */
    private String mailTitle;

    /**
     * 邮件内容
     */
    private String mailContent;

    /**
     * 状态
     */
    private Integer status;

    /**
     * 备注
     */
    private String remark;

    /**
     * 参数
     */
    private List<String> mailParams;
}
