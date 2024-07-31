package com.perfree.controller.auth.user.excelConvert;

import com.alibaba.excel.converters.Converter;
import com.alibaba.excel.metadata.GlobalConfiguration;
import com.alibaba.excel.metadata.data.ReadCellData;
import com.alibaba.excel.metadata.data.WriteCellData;
import com.alibaba.excel.metadata.property.ExcelContentProperty;
import com.perfree.enums.UserStatusEnum;

public class UserStatusExcelConvert implements Converter<Integer> {

    @Override
    public Integer convertToJavaData(ReadCellData<?> cellData, ExcelContentProperty contentProperty, GlobalConfiguration globalConfiguration) throws Exception {
        return Converter.super.convertToJavaData(cellData, contentProperty, globalConfiguration);
    }

    @Override
    public WriteCellData<?> convertToExcelData(Integer value, ExcelContentProperty contentProperty, GlobalConfiguration globalConfiguration) throws Exception {
        for (UserStatusEnum userStatusEnum : UserStatusEnum.values()) {
            if (userStatusEnum.getCode() == value) {
                return new WriteCellData<>(userStatusEnum.getMsg());
            }
        }
        return Converter.super.convertToExcelData(value, contentProperty, globalConfiguration);
    }
}
