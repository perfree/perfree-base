package com.perfree.convert.mailTemplate;

import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.mailTemplate.vo.*;
import com.perfree.model.MailTemplate;
import com.perfree.system.api.mailTemplate.dto.MailTemplateDTO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import java.util.List;

/**
 * @description 邮件模板 Convert
 * @author Perfree
 **/
@Mapper(componentModel = "spring")
public interface MailTemplateConvert {
    MailTemplateConvert INSTANCE = Mappers.getMapper(MailTemplateConvert.class);

    /**
     * model转RespVO
     * @param mailTemplate mailTemplate
     * @return MailTemplateRespVO
     */
    MailTemplateRespVO convertRespVO(MailTemplate mailTemplate);

    /**
     * model PageResult转RespVO PageResult
     * @param mailTemplatePageResult mailTemplatePageResult
     * @return PageResult
     */
    PageResult<MailTemplateRespVO> convertPageResultVO(PageResult<MailTemplate> mailTemplatePageResult);

    /**
     * AddReqVO转model
     * @param mailTemplateAddReqVO mailTemplateAddReqVO
     * @return MailTemplate
     */
    MailTemplate convertAddReqVO(MailTemplateAddReqVO mailTemplateAddReqVO);

    /**
     * UpdateReqVO转model
     * @param mailTemplateUpdateReqVO mailTemplateUpdateReqVO
     * @return MailTemplate
     */
    MailTemplate convertUpdateReqVO(MailTemplateUpdateReqVO mailTemplateUpdateReqVO);

    /**
     * model List转RespVO List
     * @param list list
     * @return List<MailTemplateRespVO>
     */
    List<MailTemplateRespVO> convertListRespVO(List<MailTemplate> list);

    /**
     * model List转ExcelVO List
     * @param list list
     * @return List<MailTemplateExcelVO>
     */
    List<MailTemplateExcelVO> convertToExcelVOList(List<MailTemplate> list);

    MailTemplateDTO convertToDTO(MailTemplate byId);

}