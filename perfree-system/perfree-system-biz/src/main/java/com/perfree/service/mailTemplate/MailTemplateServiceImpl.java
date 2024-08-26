package com.perfree.service.mailTemplate;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.mailTemplate.vo.*;
import com.perfree.convert.mailTemplate.MailTemplateConvert;
import com.perfree.mail.MailService;
import com.perfree.mapper.MailTemplateMapper;
import com.perfree.model.MailTemplate;
import jakarta.annotation.Resource;
import org.dromara.hutool.core.regex.ReUtil;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

/**
 * @description 邮件模板 ServiceImpl
 * @author Perfree
 **/
@Service
public class MailTemplateServiceImpl extends ServiceImpl<MailTemplateMapper, MailTemplate> implements MailTemplateService {

    /**
     * 正则表达式，匹配 {} 中的变量
     */
    private static final Pattern PATTERN_PARAMS = Pattern.compile("\\{(.*?)}");

    @Resource
    private MailTemplateMapper mailTemplateMapper;

    @Resource
    private MailService mailService;


    @Override
    public PageResult<MailTemplate> mailTemplatePage(MailTemplatePageReqVO pageVO) {
        return mailTemplateMapper.selectPage(pageVO);
    }

    @Override
    @Transactional
    public MailTemplate add(MailTemplateAddReqVO mailTemplateAddReqVO) {
        MailTemplate mailTemplate = MailTemplateConvert.INSTANCE.convertAddReqVO(mailTemplateAddReqVO);
        mailTemplate.setMailParams(ReUtil.findAllGroup1(PATTERN_PARAMS, mailTemplate.getMailContent()));
        mailTemplateMapper.insert(mailTemplate);
        return mailTemplate;
    }

    @Override
    @Transactional
    public MailTemplate update(MailTemplateUpdateReqVO mailTemplateUpdateReqVO) {
        MailTemplate mailTemplate = MailTemplateConvert.INSTANCE.convertUpdateReqVO(mailTemplateUpdateReqVO);
        mailTemplate.setMailParams(ReUtil.findAllGroup1(PATTERN_PARAMS, mailTemplate.getMailContent()));
        mailTemplateMapper.updateById(mailTemplate);
        return mailTemplate;
    }

    @Override
    public MailTemplate get(Integer id) {
        return mailTemplateMapper.selectById(id);
    }

    @Override
    @Transactional
    public Boolean del(Integer id) {
        mailTemplateMapper.deleteById(id);
        return true;
    }

    @Override
    public List<MailTemplate> listAll() {
        return mailTemplateMapper.listAll();
    }

    @Override
    public List<MailTemplate> queryExportData(MailTemplateExportReqVO exportReqVO) {
        return mailTemplateMapper.queryExportData(exportReqVO);
    }

    @Override
    public Boolean testMail(MailTemplateTestReqVO mailTemplateTestReqVO) {
        return mailService.sendMailByTemplateId(mailTemplateTestReqVO.getMailTemplateId(), mailTemplateTestReqVO.getReceiveMail(), mailTemplateTestReqVO.getMailParams());
    }

    @Override
    public MailTemplate getByCode(String templateCode) {
        return mailTemplateMapper.getByCode(templateCode);
    }
}
