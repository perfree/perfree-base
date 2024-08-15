package com.perfree.commons.common;

import org.dromara.hutool.core.data.id.IdUtil;

public class UUIDTool {
    public String generateUUID() {
        return IdUtil.simpleUUID();
    }
}