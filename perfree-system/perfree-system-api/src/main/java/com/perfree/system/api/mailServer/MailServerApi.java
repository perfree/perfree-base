package com.perfree.system.api.mailServer;

import com.perfree.system.api.mailServer.dto.MailServerDTO;

public interface MailServerApi {

    /**
     * 根据id获取数据
     * @param mailServerId mailServerId
     * @return MailServerDTO
     */
    MailServerDTO getById(Integer mailServerId);

}
