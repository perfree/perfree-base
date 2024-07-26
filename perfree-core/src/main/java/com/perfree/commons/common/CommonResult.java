package com.perfree.commons.common;

import com.perfree.commons.enums.ResultCodeEnum;
import com.perfree.enums.ErrorCode;
import lombok.Data;
import org.springframework.util.Assert;

import java.io.Serializable;


/**
 * @author Perfree
 * @description 定义通用返回结果集
 * @date 15:09 2023/9/28
 */
@Data
public class CommonResult<T> implements Serializable {

    /**
     * 错误码
     */
    private Integer code;

    /**
     * 返回数据
     */
    private T data;

    /**
     * 错误提示，用户可阅读
     */
    private String msg;

    /**
     * @author Perfree
     * @description 响应错误信息
     * @date 15:09 2023/9/28
     * @param code 编码
     * @param message 信息
     * @return com.perfree.commons.common.CommonResult<T>
     */
    public static <T> CommonResult<T> error(Integer code, String message) {
        Assert.isTrue(!ResultCodeEnum.SUCCESS.getCode().equals(code), "code 必须是错误的！");
        CommonResult<T> result = new CommonResult<>();
        result.code = code;
        result.msg = message;
        return result;
    }

    /**
     * @author Perfree
     * @description 响应错误信息
     * @date 15:10 2023/9/28
     * @param code 编码
     * @param message 信息
     * @param data 数据
     * @return com.perfree.commons.common.CommonResult<T>
     */
    public static <T> CommonResult<T> error(Integer code, String message, T data) {
        Assert.isTrue(!ResultCodeEnum.SUCCESS.getCode().equals(code), "code 必须是错误的！");
        CommonResult<T> result = new CommonResult<>();
        result.code = code;
        result.msg = message;
        result.data = data;
        return result;
    }

    /**
     * @author Perfree
     * @description 响应错误信息
     * @date 15:10 2023/9/28
     * @param errorCode 错误信息
     * @return com.perfree.commons.common.CommonResult<T>
     */
    public static <T> CommonResult<T> error(ErrorCode errorCode) {
        return error(errorCode.getCode(), errorCode.getMsg());
    }

    /**
     * @author Perfree
     * @description 响应成功信息
     * @date 15:10 2023/9/28
     * @param data 数据
     * @return com.perfree.commons.common.CommonResult<T>
     */
    public static <T> CommonResult<T> success(T data) {
        CommonResult<T> result = new CommonResult<>();
        result.code = ResultCodeEnum.SUCCESS.getCode();
        result.data = data;
        result.msg = "";
        return result;
    }

    /**
     * @author Perfree
     * @description 响应成功信息
     * @date 15:10 2023/9/28
     * @param msg 信息
     * @param data 数据
     * @return com.perfree.commons.common.CommonResult<T>
     */
    public static <T> CommonResult<T> success(String msg, T data) {
        CommonResult<T> result = new CommonResult<>();
        result.code = ResultCodeEnum.SUCCESS.getCode();
        result.data = data;
        result.msg = msg;
        return result;
    }
}
