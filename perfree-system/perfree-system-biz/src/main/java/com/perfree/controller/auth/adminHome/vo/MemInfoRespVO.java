package com.perfree.controller.auth.adminHome.vo;

import com.perfree.commons.utils.ArithmeticUtils;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MemInfoRespVO {

    /**
     * 内存总量
     */
    private double total;

    /**
     * 已用内存
     */
    private double used;

    /**
     * 剩余内存
     */
    private double free;

    public double getTotal() {
        return ArithmeticUtils.div(total, (1024 * 1024 * 1024), 2);
    }

    public double getUsed() {
        return ArithmeticUtils.div(used, (1024 * 1024 * 1024), 2);
    }

    public double getFree() {
        return ArithmeticUtils.div(free, (1024 * 1024 * 1024), 2);
    }

    public double getUsage() {
        return ArithmeticUtils.mul(ArithmeticUtils.div(used, total, 4), 100);
    }
}
