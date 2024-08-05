package com.perfree.commons.common;
import cn.hutool.core.util.IdUtil;

public class UUIDTool {
    public String generateUUID() {
        return IdUtil.simpleUUID();
    }
}