package com.perfree.commons.exception;

import com.perfree.enums.ErrorCode;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * @author Perfree
 * @description 定义业务逻辑异常 Exception
 * @date 15:14 2023/9/28
 */
@Data
@EqualsAndHashCode(callSuper = true)
public final class ServiceException extends RuntimeException {

    /**
     * 业务错误码
     */
    private Integer code;
    /**
     * 错误提示
     */
    private String message;

    /**
     * 空构造方法，避免反序列化问题
     */
    public ServiceException() {
    }

    public ServiceException(ErrorCode serviceErrorCode) {
        this.code = serviceErrorCode.getCode();
        this.message = serviceErrorCode.getMsg();
    }

    public ServiceException(Integer code, String message) {
        this.code = code;
        this.message = message;
    }

    public Integer getCode() {
        return code;
    }

    public ServiceException setCode(Integer code) {
        this.code = code;
        return this;
    }

    @Override
    public String getMessage() {
        return message;
    }

    public ServiceException setMessage(String message) {
        this.message = message;
        return this;
    }

}
