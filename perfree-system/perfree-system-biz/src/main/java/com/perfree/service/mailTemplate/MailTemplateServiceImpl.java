package com.perfree.service.mailTemplate;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.perfree.commons.common.PageResult;
import com.perfree.commons.utils.SortingFieldUtils;
import com.perfree.controller.auth.mailTemplate.vo.*;
import com.perfree.convert.mailTemplate.MailTemplateConvert;
import com.perfree.mapper.MailTemplateMapper;
import com.perfree.model.MailTemplate;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

/**
 * @description 邮件模板 ServiceImpl
 * @author Perfree
 **/
@Service
public class MailTemplateServiceImpl extends ServiceImpl<MailTemplateMapper, MailTemplate> implements MailTemplateService {

    @Resource
    private MailTemplateMapper mailTemplateMapper;


    @Override
    public PageResult<MailTemplate> mailTemplatePage(MailTemplatePageReqVO pageVO) {
        return mailTemplateMapper.selectPage(pageVO);
    }

    @Override
    @Transactional
    public MailTemplate add(MailTemplateAddReqVO mailTemplateAddReqVO) {
        MailTemplate mailTemplate = MailTemplateConvert.INSTANCE.convertAddReqVO(mailTemplateAddReqVO);
        mailTemplateMapper.insert(mailTemplate);
        return mailTemplate;
    }

    @Override
    @Transactional
    public MailTemplate update(MailTemplateUpdateReqVO mailTemplateUpdateReqVO) {
        MailTemplate mailTemplate = MailTemplateConvert.INSTANCE.convertUpdateReqVO(mailTemplateUpdateReqVO);
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
}
