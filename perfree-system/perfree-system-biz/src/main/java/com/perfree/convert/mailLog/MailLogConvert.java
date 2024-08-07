package com.perfree.convert.mailLog;

import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.mailLog.vo.*;
import com.perfree.model.MailLog;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import java.util.List;

/**
 * @description 邮件日志 Convert
 * @author Perfree
 **/
@Mapper(componentModel = "spring")
public interface MailLogConvert {
    MailLogConvert INSTANCE = Mappers.getMapper(MailLogConvert.class);

    /**
     * model转RespVO
     * @param mailLog mailLog
     * @return MailLogRespVO
     */
    MailLogRespVO convertRespVO(MailLog mailLog);

    /**
     * model PageResult转RespVO PageResult
     * @param mailLogPageResult mailLogPageResult
     * @return PageResult
     */
    PageResult<MailLogRespVO> convertPageResultVO(PageResult<MailLog> mailLogPageResult);

    /**
     * AddReqVO转model
     * @param mailLogAddReqVO mailLogAddReqVO
     * @return MailLog
     */
    MailLog convertAddReqVO(MailLogAddReqVO mailLogAddReqVO);

    /**
     * UpdateReqVO转model
     * @param mailLogUpdateReqVO mailLogUpdateReqVO
     * @return MailLog
     */
    MailLog convertUpdateReqVO(MailLogUpdateReqVO mailLogUpdateReqVO);

    /**
     * model List转RespVO List
     * @param list list
     * @return List<MailLogRespVO>
     */
    List<MailLogRespVO> convertListRespVO(List<MailLog> list);

    /**
     * model List转ExcelVO List
     * @param list list
     * @return List<MailLogExcelVO>
     */
    List<MailLogExcelVO> convertToExcelVOList(List<MailLog> list);
}