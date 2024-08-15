package com.perfree.commons.excel;

import com.alibaba.excel.converters.Converter;
import com.alibaba.excel.converters.ReadConverterContext;
import com.alibaba.excel.converters.WriteConverterContext;
import com.alibaba.excel.enums.CellDataTypeEnum;
import com.alibaba.excel.metadata.GlobalConfiguration;
import com.alibaba.excel.metadata.data.ReadCellData;
import com.alibaba.excel.metadata.data.WriteCellData;
import com.alibaba.excel.metadata.property.ExcelContentProperty;
import com.perfree.cache.DictDataCacheService;
import com.perfree.commons.utils.SpringBeanUtil;
import com.perfree.system.api.dictData.dto.DictDataDTO;
import org.dromara.hutool.core.convert.Convert;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class DictExcelConvert implements Converter<Object> {

    private final static Logger LOGGER = LoggerFactory.getLogger(DictExcelConvert.class);

    @Override
    public Class<?> supportJavaTypeKey() {
        throw new UnsupportedOperationException("暂不支持，也不需要");
    }

    @Override
    public CellDataTypeEnum supportExcelTypeKey() {
        throw new UnsupportedOperationException("暂不支持，也不需要");
    }

    @Override
    public Object convertToJavaData(ReadConverterContext<?> context) throws Exception {
        return convertToJavaData(context.getReadCellData(), context.getContentProperty(),
                context.getAnalysisContext().currentReadHolder().globalConfiguration());
    }

    @Override
    public Object convertToJavaData(ReadCellData readCellData, ExcelContentProperty contentProperty,
                                    GlobalConfiguration globalConfiguration) {
        String parentDictType = getParentDictType(contentProperty);
        String dictLabel = readCellData.getStringValue();
        DictDataCacheService dataCacheService = SpringBeanUtil.context.getBean(DictDataCacheService.class);
        DictDataDTO byDictValueAndParentDictType = dataCacheService.getByDictValueAndParentDictType(parentDictType, dictLabel);
        if (null == byDictValueAndParentDictType) {
            LOGGER.error("数据字典中不存在parentDictType:{}, dictLabel: {}", parentDictType, dictLabel);
            return null;
        }
        Class<?> fieldClazz = contentProperty.getField().getType();
        return Convert.convert(fieldClazz, byDictValueAndParentDictType.getDictValue());
    }

    @Override
    public WriteCellData<?> convertToExcelData(WriteConverterContext<Object> context) throws Exception {
        return convertToExcelData(context.getValue(), context.getContentProperty(), context.getWriteContext().currentWriteHolder().globalConfiguration());
    }

    @Override
    public WriteCellData<?> convertToExcelData(Object value, ExcelContentProperty contentProperty, GlobalConfiguration globalConfiguration) throws Exception {
        if (value == null) {
            return new WriteCellData<>("");
        }
        String parentDictType = getParentDictType(contentProperty);
        String dictValue = String.valueOf(value);
        DictDataCacheService dataCacheService = SpringBeanUtil.context.getBean(DictDataCacheService.class);
        DictDataDTO byDictValueAndParentDictType = dataCacheService.getByDictValueAndParentDictType(parentDictType, dictValue);
        if (null == byDictValueAndParentDictType) {
            LOGGER.error("数据字典中不存在parentDictType:{}, dictValue: {}", parentDictType, dictValue);
            return new WriteCellData<>("");
        }
        return new WriteCellData<>(byDictValueAndParentDictType.getDictLabel());
    }

    private static String getParentDictType(ExcelContentProperty contentProperty) {
        return contentProperty.getField().getAnnotation(DictFormat.class).value();
    }
}
