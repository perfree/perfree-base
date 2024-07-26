package com.perfree.convert.extra;


import com.perfree.controller.auth.extra.vo.ExtraRespVO;
import com.perfree.model.Extra;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface ExtraConvert {
    ExtraConvert INSTANCE = Mappers.getMapper(ExtraConvert.class);


    ExtraRespVO convertRespVO(Extra byKey);
}
