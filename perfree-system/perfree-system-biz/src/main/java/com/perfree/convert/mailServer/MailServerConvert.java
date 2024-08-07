package com.perfree.convert.mailServer;

import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.mailServer.vo.*;
import com.perfree.model.MailServer;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import java.util.List;

/**
 * @description 邮箱服务 Convert
 * @author Perfree
 **/
@Mapper(componentModel = "spring")
public interface MailServerConvert {
    MailServerConvert INSTANCE = Mappers.getMapper(MailServerConvert.class);

    /**
     * model转RespVO
     * @param mailServer mailServer
     * @return MailServerRespVO
     */
    MailServerRespVO convertRespVO(MailServer mailServer);

    /**
     * model PageResult转RespVO PageResult
     * @param mailServerPageResult mailServerPageResult
     * @return PageResult
     */
    PageResult<MailServerRespVO> convertPageResultVO(PageResult<MailServer> mailServerPageResult);

    /**
     * AddReqVO转model
     * @param mailServerAddReqVO mailServerAddReqVO
     * @return MailServer
     */
    MailServer convertAddReqVO(MailServerAddReqVO mailServerAddReqVO);

    /**
     * UpdateReqVO转model
     * @param mailServerUpdateReqVO mailServerUpdateReqVO
     * @return MailServer
     */
    MailServer convertUpdateReqVO(MailServerUpdateReqVO mailServerUpdateReqVO);

    /**
     * model List转RespVO List
     * @param list list
     * @return List<MailServerRespVO>
     */
    List<MailServerRespVO> convertListRespVO(List<MailServer> list);

    /**
     * model List转ExcelVO List
     * @param list list
     * @return List<MailServerExcelVO>
     */
    List<MailServerExcelVO> convertToExcelVOList(List<MailServer> list);
}