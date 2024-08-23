package com.perfree.service.adminHome;

import com.perfree.commons.utils.ArithmeticUtils;
import com.perfree.controller.auth.adminHome.vo.*;
import com.perfree.plugin.PluginInfoHolder;
import com.perfree.service.attach.AttachService;
import com.perfree.service.plugins.PluginsService;
import com.perfree.service.user.UserService;
import jakarta.annotation.Resource;
import org.dromara.hutool.core.net.Ipv4Util;
import org.springframework.stereotype.Service;
import oshi.SystemInfo;
import oshi.hardware.CentralProcessor;
import oshi.hardware.HardwareAbstractionLayer;
import oshi.software.os.FileSystem;
import oshi.software.os.OSFileStore;
import oshi.util.Util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Properties;

@Service
public class AdminHomeServiceImpl implements AdminHomeService {

    private static final int OSHI_WAIT_SECOND = 1000;

    @Resource
    private UserService userService;

    @Resource
    private AttachService attachService;

    @Resource
    private PluginsService pluginsService;


    @Override
    public ServerInfoRespVO getServerInfo() {
        ServerInfoRespVO serverInfoRespVO = new ServerInfoRespVO();
        SystemInfo si = new SystemInfo();
        HardwareAbstractionLayer hal = si.getHardware();

        // CPU信息
        long[] prevTicks = hal.getProcessor().getSystemCpuLoadTicks();
        Util.sleep(OSHI_WAIT_SECOND);
        long[] ticks = hal.getProcessor().getSystemCpuLoadTicks();
        long nice = ticks[CentralProcessor.TickType.NICE.getIndex()] - prevTicks[CentralProcessor.TickType.NICE.getIndex()];
        long irq = ticks[CentralProcessor.TickType.IRQ.getIndex()] - prevTicks[CentralProcessor.TickType.IRQ.getIndex()];
        long softIrq = ticks[CentralProcessor.TickType.SOFTIRQ.getIndex()] - prevTicks[CentralProcessor.TickType.SOFTIRQ.getIndex()];
        long steal = ticks[CentralProcessor.TickType.STEAL.getIndex()] - prevTicks[CentralProcessor.TickType.STEAL.getIndex()];
        long cSys = ticks[CentralProcessor.TickType.SYSTEM.getIndex()] - prevTicks[CentralProcessor.TickType.SYSTEM.getIndex()];
        long user = ticks[CentralProcessor.TickType.USER.getIndex()] - prevTicks[CentralProcessor.TickType.USER.getIndex()];
        long ioWait = ticks[CentralProcessor.TickType.IOWAIT.getIndex()] - prevTicks[CentralProcessor.TickType.IOWAIT.getIndex()];
        long idle = ticks[CentralProcessor.TickType.IDLE.getIndex()] - prevTicks[CentralProcessor.TickType.IDLE.getIndex()];
        long totalCpu = user + nice + cSys + idle + ioWait + irq + softIrq + steal;

        CpuInfoRespVO cpuInfoRespVO = CpuInfoRespVO.builder()
                .cpuName(hal.getProcessor().getProcessorIdentifier().getName())
                .cpuNum(hal.getProcessor().getLogicalProcessorCount())
                .maxFrequency(hal.getProcessor().getMaxFreq())
                .total(totalCpu)
                .free(idle)
                .ioWait(ioWait)
                .used(user)
                .sys(cSys)
                .build();
        serverInfoRespVO.setCpuInfo(cpuInfoRespVO);

        // 内存信息
        MemInfoRespVO memInfoRespVO = MemInfoRespVO.builder()
                .total(hal.getMemory().getTotal())
                .free(hal.getMemory().getAvailable())
                .used(hal.getMemory().getTotal() - hal.getMemory().getAvailable())
                .build();
        serverInfoRespVO.setMemInfo(memInfoRespVO);

        // 服务器信息
        Properties props = System.getProperties();
        SysInfoRespVO sysInfoRespVO = SysInfoRespVO.builder()
                .computerName(Ipv4Util.getLocalhost().getHostName())
                .computerIp(Ipv4Util.getLocalhost().getHostAddress())
                .osName(props.getProperty("os.name"))
                .osArch(props.getProperty("os.arch"))
                .userDir(props.getProperty("user.dir"))
                .build();
        serverInfoRespVO.setSysInfo(sysInfoRespVO);

        // JVM信息
        JvmInfoRespVO jvmInfoRespVO = JvmInfoRespVO.builder()
                .max(Runtime.getRuntime().maxMemory())
                .total(Runtime.getRuntime().totalMemory())
                .free(Runtime.getRuntime().freeMemory())
                .version(props.getProperty("java.version"))
                .home(props.getProperty("java.home"))
                .build();
        serverInfoRespVO.setJvmInfo(jvmInfoRespVO);

        // 磁盘信息
        FileSystem fileSystem = si.getOperatingSystem().getFileSystem();
        OSFileStore[] fsArray = fileSystem.getFileStores().toArray(new OSFileStore[0]);
        List<SysFileInfoRespVO> sysFileInfoRespVOList = new ArrayList<>();
        for (OSFileStore fs : fsArray) {
            long free = fs.getUsableSpace();
            long total = fs.getTotalSpace();
            long used = total - free;
            SysFileInfoRespVO sysFileInfoRespVO = SysFileInfoRespVO.builder()
                    .dirName(fs.getMount())
                    .sysTypeName(fs.getType())
                    .total(ArithmeticUtils.convertFileSize(total))
                    .free(ArithmeticUtils.convertFileSize(free))
                    .used(ArithmeticUtils.convertFileSize(used))
                    .usage(ArithmeticUtils.mul(ArithmeticUtils.div(used, total, 4), 100))
                    .build();
            sysFileInfoRespVOList.add(sysFileInfoRespVO);
        }
        serverInfoRespVO.setSysFileInfoList(sysFileInfoRespVOList);
        return serverInfoRespVO;
    }

    @Override
    public HomeStatisticRespVO getHomeStatistic() {
        HomeStatisticRespVO homeStatisticRespVO = attachService.getTypeCount();
        if (null == homeStatisticRespVO) {
            homeStatisticRespVO = new HomeStatisticRespVO();
        }
        homeStatisticRespVO.setUserTotal(userService.getTotalUser());
        homeStatisticRespVO.setAttachTotal(attachService.getTotalAttach());
        homeStatisticRespVO.setInstallPluginTotal(pluginsService.getTotalPlugins());
        homeStatisticRespVO.setRunningPluginTotal((long) PluginInfoHolder.getAllPluginInfo().size());
        return homeStatisticRespVO;
    }
}
