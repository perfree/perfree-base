package com.perfree.controller.auth.adminHome.vo;

import com.perfree.commons.utils.ArithmeticUtils;
import lombok.Builder;
import lombok.Data;

import java.lang.management.ManagementFactory;

@Data
@Builder
public class JvmInfoRespVO {

    /**
     * 当前JVM占用的内存总数(M)
     */
    private double total;

    /**
     * JVM最大可用内存总数(M)
     */
    private double max;

    /**
     * JVM空闲内存(M)
     */
    private double free;

    /**
     * JDK版本
     */
    private String version;

    /**
     * JDK路径
     */
    private String home;

    public double getTotal() {
        return ArithmeticUtils.div(total, (1024 * 1024), 2);
    }


    public double getMax() {
        return ArithmeticUtils.div(max, (1024 * 1024), 2);
    }

    public double getFree() {
        return ArithmeticUtils.div(free, (1024 * 1024), 2);
    }


    public double getUsed() {
        return ArithmeticUtils.div(total - free, (1024 * 1024), 2);
    }

    public double getUsage() {
        return ArithmeticUtils.mul(ArithmeticUtils.div(total - free, total, 4), 100);
    }

    /**
     * 获取JDK名称
     */
    public String getName() {
        return ManagementFactory.getRuntimeMXBean().getVmName();
    }

}
