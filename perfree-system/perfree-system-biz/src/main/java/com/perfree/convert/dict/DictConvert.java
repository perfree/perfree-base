package com.perfree.convert.dict;

import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.dict.vo.*;
import com.perfree.model.Dict;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import java.util.List;

/**
 * @description 数据字典 Convert
 * @author Perfree
 **/
@Mapper(componentModel = "spring")
public interface DictConvert {
    DictConvert INSTANCE = Mappers.getMapper(DictConvert.class);

    /**
     * model转RespVO
     * @param dict dict
     * @return DictRespVO
     */
    DictRespVO convertRespVO(Dict dict);

    /**
     * model PageResult转RespVO PageResult
     * @param dictPageResult dictPageResult
     * @return PageResult
     */
    PageResult<DictRespVO> convertPageResultVO(PageResult<Dict> dictPageResult);

    /**
     * AddReqVO转model
     * @param dictAddReqVO dictAddReqVO
     * @return Dict
     */
    Dict convertAddReqVO(DictAddReqVO dictAddReqVO);

    /**
     * UpdateReqVO转model
     * @param dictUpdateReqVO dictUpdateReqVO
     * @return Dict
     */
    Dict convertUpdateReqVO(DictUpdateReqVO dictUpdateReqVO);

    /**
     * model List转RespVO List
     * @param list list
     * @return List<DictRespVO>
     */
    List<DictRespVO> convertListRespVO(List<Dict> list);
}