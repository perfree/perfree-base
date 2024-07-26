package com.perfree.exception;

import com.perfree.commons.common.CommonResult;
import com.perfree.commons.enums.ResultCodeEnum;
import com.perfree.commons.exception.ServiceException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageConversionException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.io.IOException;
import java.util.List;
import java.util.Objects;

/**
 * @author Perfree
 * @description 定义全局异常处理
 * @date 15:37 2023/9/28
 */
@ControllerAdvice
public class GlobalExceptionHandler{
    private final static Logger LOGGER = LoggerFactory.getLogger(GlobalExceptionHandler.class);



    @ExceptionHandler(NoResourceFoundException.class)
    @ResponseBody
    public void handleNoResourceFoundException(NoResourceFoundException exception) {
        LOGGER.error(exception.getMessage());
    }
    /**
     * @author Perfree
     * @description MethodArgumentNotValidException
     * @date 15:37 2023/9/28
     * @param exception exception
     * @return com.perfree.commons.common.CommonResult<?>
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseBody
    public CommonResult<?> validationBodyException(MethodArgumentNotValidException exception) {
        BindingResult result = exception.getBindingResult();
        Objects.requireNonNull(result.getFieldError());
        LOGGER.error(result.getFieldError().getDefaultMessage());
        return CommonResult.error(ResultCodeEnum.FAIL.getCode(), result.getFieldError().getDefaultMessage());
    }

    /**
     * @author Perfree
     * @description HttpMessageConversionException
     * @date 15:37 2023/9/28
     * @param exception HttpMessageConversionException
     * @return com.perfree.commons.common.CommonResult<?>
     */
    @ExceptionHandler(HttpMessageConversionException.class)
    @ResponseBody
    public CommonResult<?> parameterTypeException(HttpMessageConversionException exception) {
        LOGGER.error(exception.getMessage(), exception);
        return CommonResult.error(ResultCodeEnum.FAIL.getCode(), exception.getMessage());
    }

    /**
     * @author Perfree
     * @description BindException
     * @date 15:38 2023/9/28
     * @param e BindException
     * @return com.perfree.commons.common.CommonResult<?>
     */
    @ExceptionHandler(BindException.class)
    @ResponseBody
    public CommonResult<?> handleBindException(Exception e) {
        List<ObjectError> list = ((BindException) e).getAllErrors();
        if (list.size() > 0) {
            LOGGER.error(list.get(0).getDefaultMessage());
            return CommonResult.error(ResultCodeEnum.FAIL.getCode(), list.get(0).getDefaultMessage());
        }
        return CommonResult.error(ResultCodeEnum.FAIL.getCode(), "参数错误");
    }

    /**
     * @author Perfree
     * @description 业务相关异常
     * @date 15:38 2023/9/28
     * @param exception ServiceException
     * @return com.perfree.commons.common.CommonResult<?>
     */
    @ExceptionHandler(ServiceException.class)
    @ResponseBody
    public CommonResult<?> handleServiceException(Exception exception) {
        LOGGER.error(exception.getMessage(),exception);
        return CommonResult.error(ResultCodeEnum.FAIL.getCode(), exception.getMessage());
    }

    @ExceptionHandler(AccessDeniedException.class)
    @ResponseBody
    public CommonResult<?> handleAccessDeniedException(Exception exception) {
        LOGGER.error(exception.getMessage(), exception);
        return CommonResult.error(ResultCodeEnum.AUTH_FORBIDDEN.getCode(), ResultCodeEnum.AUTH_FORBIDDEN.getMsg());
    }

    @ExceptionHandler(value = IOException.class)
    public ResponseEntity<Object> handleIOException(IOException ex) {
        if (ex.getMessage().contains("Connection reset by peer")) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        LOGGER.error(ex.getMessage(), ex);
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    @ResponseBody
    public CommonResult<?> handleException(Exception exception) {
        LOGGER.error(exception.getMessage(), exception);
        return CommonResult.error(ResultCodeEnum.FAIL.getCode(), exception.getMessage());
    }
}
