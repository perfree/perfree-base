package com.perfree.mail;

import com.perfree.commons.exception.ServiceException;
import com.perfree.constant.MailLogConstant;
import com.perfree.enums.ErrorCode;
import com.perfree.system.api.mailLog.MailLogApi;
import com.perfree.system.api.mailLog.dto.MailLogDTO;
import com.perfree.system.api.mailServer.MailServerApi;
import com.perfree.system.api.mailServer.dto.MailServerDTO;
import com.perfree.system.api.mailTemplate.MailTemplateApi;
import com.perfree.system.api.mailTemplate.dto.MailTemplateDTO;
import com.sun.mail.util.MailSSLSocketFactory;
import jakarta.annotation.Resource;
import org.dromara.hutool.extra.mail.MailAccount;
import org.dromara.hutool.extra.mail.MailUtil;
import org.dromara.hutool.http.html.HtmlUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.security.GeneralSecurityException;
import java.time.LocalDateTime;
import java.util.HashMap;

@Service
public class MailService {

    private static final Logger LOGGER = LoggerFactory.getLogger(MailService.class);
    @Resource
    private MailTemplateApi mailTemplateApi;

    @Resource
    private MailServerApi mailServerApi;

    @Resource
    private MailLogApi mailLogApi;

    /**
     * 根据模板id发送邮件
     * @param templateId templateId
     * @param receiveMail receiveMail
     * @param params params
     * @return Boolean
     */
    public Boolean sendMailByTemplateId(Integer templateId, String receiveMail, HashMap<String, String> params){
        boolean result = false;
        MailLogDTO mailLogDTO = null;
        try{
            MailTemplateDTO mailTemplateDTO =  mailTemplateApi.getById(templateId);
            if (null == mailTemplateDTO) {
                throw new ServiceException(ErrorCode.MAIL_TEMPLATE_NOT_EXIST);
            }
            MailServerDTO mailServerDTO = mailServerApi.getById(mailTemplateDTO.getMailServerId());
            if (null == mailServerDTO) {
                throw new ServiceException(ErrorCode.MAIL_SERVER_NOT_EXIST);
            }
            String content = handleContentParams(mailTemplateDTO.getMailContent(), params);

            // 创建log记录
            mailLogDTO = MailLogDTO.builder().build();
            mailLogDTO.setMailTemplateCode(mailTemplateDTO.getCode());
            mailLogDTO.setMailTitle(mailTemplateDTO.getMailTitle());
            mailLogDTO.setSendMail(mailServerDTO.getAccount());
            mailLogDTO.setContent(content);
            mailLogDTO.setSendDate(LocalDateTime.now());
            mailLogDTO.setReceiveMail(receiveMail);

            // 发送邮件
            MailAccount account = new MailAccount();
            account.setFrom(mailServerDTO.getUserName())
                    .setHost(mailServerDTO.getAddress()).setPort(mailServerDTO.getPort()).setSslEnable(mailServerDTO.getEnableSSL() == 0)
                    .setAuth(true).setUser(mailServerDTO.getAccount()).setPass(mailServerDTO.getPassword().toCharArray());
            MailSSLSocketFactory sf = new MailSSLSocketFactory();
            sf.setTrustAllHosts(true);
            account.setCustomProperty("mail.smtp.ssl.socketFactory", sf);
            String send = MailUtil.send(account, receiveMail, mailTemplateDTO.getMailTitle(), content, true);
            LOGGER.info("邮件发送结果:{}", send);
            result = true;
        }catch (Exception e) {
            LOGGER.error("邮件发送失败", e);
        }

        // 记录日志
        if (null != mailLogDTO) {
            mailLogDTO.setSendStatus(result ? MailLogConstant.MAIL_LOG_STATUS_SEND_SUCCESS : MailLogConstant.MAIL_LOG_STATUS_SEND_FAIL);
            mailLogApi.saveMailLog(mailLogDTO);
        }
        return result;
    }


    /**
     * 处理模板参数
     * @param content content
     * @param params params
     * @return String
     */
    private String handleContentParams(String content, HashMap<String, String> params) {
        if (params.isEmpty()) {
            return content;
        }
        for (String key : params.keySet()) {
            content = content.replaceAll("\\{" + key + "}", params.get(key));
        }

        return content;
    }
}
