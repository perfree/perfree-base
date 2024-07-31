package com.demo.convert;


import com.demo.controller.demo.vo.DemoAddReqVO;
import com.demo.controller.demo.vo.DemoRespVO;
import com.demo.controller.demo.vo.DemoUpdateReqVO;
import com.demo.model.Demo;
import com.perfree.commons.common.PageResult;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface DemoConvert {

    PageResult<DemoRespVO> convertPageResultVO(PageResult<Demo> demoPageResult);

    DemoRespVO convertRespVO(Demo demo);

    Demo convertAddReqVOToModel(DemoAddReqVO demoAddReqVO);

    Demo convertUpdateReqVOToModel(DemoUpdateReqVO demoUpdateReqVO);

}
