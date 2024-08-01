package com.perfree.convert.dictData;

import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.dictData.vo.*;
import com.perfree.model.DictData;
import com.perfree.system.api.dictData.dto.DictDataDTO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import java.util.List;

/**
 * @description 数据字典值 Convert
 * @author Perfree
 **/
@Mapper(componentModel = "spring")
public interface DictDataConvert {
    DictDataConvert INSTANCE = Mappers.getMapper(DictDataConvert.class);

    /**
     * model转RespVO
     * @param dictData dictData
     * @return DictDataRespVO
     */
    DictDataRespVO convertRespVO(DictData dictData);

    /**
     * model PageResult转RespVO PageResult
     * @param dictDataPageResult dictDataPageResult
     * @return PageResult
     */
    PageResult<DictDataRespVO> convertPageResultVO(PageResult<DictData> dictDataPageResult);

    /**
     * AddReqVO转model
     * @param dictDataAddReqVO dictDataAddReqVO
     * @return DictData
     */
    DictData convertAddReqVO(DictDataAddReqVO dictDataAddReqVO);

    /**
     * UpdateReqVO转model
     * @param dictDataUpdateReqVO dictDataUpdateReqVO
     * @return DictData
     */
    DictData convertUpdateReqVO(DictDataUpdateReqVO dictDataUpdateReqVO);

    /**
     * model List转RespVO List
     * @param list list
     * @return List<DictDataRespVO>
     */
    List<DictDataRespVO> convertListRespVO(List<DictData> list);

    List<DictDataDTO> convertToDTOList(List<DictData> dictDataList);

    DictDataDTO convertToDTO(DictData dictData);

}