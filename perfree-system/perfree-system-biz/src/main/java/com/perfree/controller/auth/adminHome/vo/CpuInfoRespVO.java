package com.perfree.controller.auth.adminHome.vo;

import com.perfree.commons.utils.ArithmeticUtils;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CpuInfoRespVO {

    /**
     * cpuName
     */
    private String cpuName;

    private double maxFrequency;

    /**
     * 核心数
     */
    private int cpuNum;

    /**
     * CPU总的使用率
     */
    private double total;

    /**
     * CPU系统使用率
     */
    private double sys;

    /**
     * CPU用户使用率
     */
    private double used;

    /**
     * CPU当前等待率
     */
    private double ioWait;

    /**
     * CPU当前空闲率
     */
    private double free;

    public double getTotal() {
        return ArithmeticUtils.round(ArithmeticUtils.mul(total, 100), 2);
    }

    public double getSys() {
        return ArithmeticUtils.round(ArithmeticUtils.mul(sys / total, 100), 2);
    }

    public double getUsed() {
        return ArithmeticUtils.round(ArithmeticUtils.mul(used / total, 100), 2);
    }

    public double getIoWait() {
        return ArithmeticUtils.round(ArithmeticUtils.mul(ioWait / total, 100), 2);
    }

    public double getFree() {
        return ArithmeticUtils.round(ArithmeticUtils.mul(free / total, 100), 2);
    }

    public double getMaxFrequency() {
        return ArithmeticUtils.round(ArithmeticUtils.div(maxFrequency, 1000000000), 2);
    }

}
