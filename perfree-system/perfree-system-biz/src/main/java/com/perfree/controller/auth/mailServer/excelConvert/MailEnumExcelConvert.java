package com.perfree.controller.auth.mailServer.excelConvert;

import com.alibaba.excel.converters.Converter;
import com.alibaba.excel.metadata.GlobalConfiguration;
import com.alibaba.excel.metadata.data.ReadCellData;
import com.alibaba.excel.metadata.data.WriteCellData;
import com.alibaba.excel.metadata.property.ExcelContentProperty;
import com.perfree.enums.MailEnum;

public class MailEnumExcelConvert implements Converter<Object> {

    @Override
    public Object convertToJavaData(ReadCellData<?> cellData, ExcelContentProperty contentProperty, GlobalConfiguration globalConfiguration) throws Exception {
        return Converter.super.convertToJavaData(cellData, contentProperty, globalConfiguration);
    }

    @Override
    public WriteCellData<?> convertToExcelData(Object value, ExcelContentProperty contentProperty, GlobalConfiguration globalConfiguration) throws Exception {
        for (MailEnum mailEnum : MailEnum.values()) {
            if (String.valueOf(mailEnum.getCode() ).equals(String.valueOf(value))) {
                return new WriteCellData<>(mailEnum.getMsg());
            }
        }
        return Converter.super.convertToExcelData(value, contentProperty, globalConfiguration);
    }
}
