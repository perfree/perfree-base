package com.perfree.service.mailTemplate;

import com.baomidou.mybatisplus.extension.service.IService;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.mailTemplate.vo.*;
import com.perfree.model.MailTemplate;

import java.util.List;

/**
 * @description 邮件模板 Service
 * @author Perfree
 **/
public interface MailTemplateService extends IService<MailTemplate> {

    /**
     * 邮件模板分页
     * @param pageVO pageVO
     * @return PageResult<MailTemplate>
     */
    PageResult<MailTemplate> mailTemplatePage(MailTemplatePageReqVO pageVO);

    /**
     * 添加邮件模板
     * @param addReqVO addReqVO
     * @return MailTemplate
     */
    MailTemplate add(MailTemplateAddReqVO addReqVO);

    /**
     * 更新邮件模板
     * @param updateReqVO updateReqVO
     * @return MailTemplate
     */
    MailTemplate update(MailTemplateUpdateReqVO updateReqVO);

    /**
     * 根据id获取邮件模板信息
     * @param id id
     * @return MailTemplate
     */
    MailTemplate get(Integer id);

    /**
     * 根据id删除邮件模板
     * @param id id
     * @return Boolean
     */
    Boolean del(Integer id);

    /**
     * 获取所有邮件模板
     * @return List<MailTemplate>
     */
    List<MailTemplate> listAll();

    /**
     * 查询要导出的数据
     * @param exportReqVO exportReqVO
     * @return List<MailTemplate>
     */
    List<MailTemplate> queryExportData(MailTemplateExportReqVO exportReqVO);

    /**
     * 发送测试邮件
     * @param mailTemplateTestReqVO mailTemplateTestReqVO
     * @return Boolean
     */
    Boolean testMail(MailTemplateTestReqVO mailTemplateTestReqVO);

}