package com.perfree.system.api.mailTemplate;

import com.perfree.system.api.mailTemplate.dto.MailTemplateDTO;

public interface MailTemplateApi {

    /**
     * 根据id获取数据
     * @param templateId templateId
     * @return MailTemplateDTO
     */
    MailTemplateDTO getById(Integer templateId);

    MailTemplateDTO getByCode(String templateCode);

}
