package com.perfree.plugin.exception;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * @author Perfree
 * @description 定义插件异常 Exception
 * @date 15:14 2023/9/28
 */
@Data
@EqualsAndHashCode(callSuper = true)
public final class PluginException extends RuntimeException {

    /**
     * 错误提示
     */
    private String message;

    /**
     * 空构造方法，避免反序列化问题
     */
    public PluginException() {
    }


    public PluginException(String message) {
        this.message = message;
    }

    @Override
    public String getMessage() {
        return message;
    }

    public PluginException setMessage(String message) {
        this.message = message;
        return this;
    }

}
