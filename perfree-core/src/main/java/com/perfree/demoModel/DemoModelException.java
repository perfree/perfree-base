package com.perfree.demoModel;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public final class DemoModelException extends RuntimeException {

    /**
     * 错误提示
     */
    private String message;

    /**
     * 空构造方法，避免反序列化问题
     */
    public DemoModelException() {
    }

    public DemoModelException(String message) {
        this.message = message;
    }
}
