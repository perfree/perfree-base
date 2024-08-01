package com.perfree.config;

import com.perfree.cache.AttachConfigCacheService;
import com.perfree.cache.OptionCacheService;
import com.perfree.commons.utils.SpringBeanUtil;
import com.perfree.convert.attachConfig.AttachConfigConvert;
import com.perfree.convert.dictData.DictDataConvert;
import com.perfree.convert.option.OptionConvert;
import com.perfree.file.FileHandleStorageHolder;
import com.perfree.file.handle.local.FileLocalHandleImpl;
import com.perfree.file.handle.s3.FileS3HandleImpl;
import com.perfree.mapper.AttachConfigMapper;
import com.perfree.model.AttachConfig;
import com.perfree.model.DictData;
import com.perfree.model.Option;
import com.perfree.plugin.PluginInfo;
import com.perfree.plugin.PluginInfoHolder;
import com.perfree.service.attachConfig.AttachConfigService;
import com.perfree.service.dictData.DictDataService;
import com.perfree.service.option.OptionService;
import com.perfree.service.plugins.PluginsService;
import com.perfree.system.api.attachConfig.dto.AttachConfigCacheDTO;
import com.perfree.system.api.dictData.dto.DictDataDTO;
import com.perfree.system.api.option.dto.OptionDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

/**
 * @author Perfree
 * @description 初始化执行
 * @date 15:39 2023/9/28
 */
@Component
public class AppInit implements ApplicationRunner {

    private static final Logger LOGGER = LoggerFactory.getLogger(ApplicationRunner.class);

    @Value("${server.port}")
    private String port;

    private final PluginsService pluginsService;

    private final OptionService optionService;

    private final AttachConfigService attachConfigService;

    private final DictDataService dictDataService;

    public AppInit(OptionService optionService,  AttachConfigService attachConfigService,
                   PluginsService pluginsService, DictDataService dictDataService) {
        this.optionService = optionService;
        this.attachConfigService = attachConfigService;
        this.pluginsService = pluginsService;
        this.dictDataService = dictDataService;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        LOGGER.info("-> 初始化存储策略配置缓存....");
        initFileHandleCache();
        attachConfigService.initAttachConfigCache();
        LOGGER.info("-> 初始化存储策略配置缓存完成");

        LOGGER.info("-> 初始化配置缓存....");
        optionService.initOptionCache();
        LOGGER.info("-> 初始化配置缓存完成");

        LOGGER.info("-> 初始化数据字典缓存....");
        dictDataService.initDictDataCache();
        LOGGER.info("-> 初始化数据字典缓存完成");

        LOGGER.info("-> 初始化静态资源映射规则....");
        attachConfigService.initLocalResourcesPatterns();
        LOGGER.info("-> 初始化静态资源映射规则完成");

        LOGGER.info("-> 初始化插件....");
        pluginsService.watchMonitorDevPlugins();
        pluginsService.initPlugins();
        List<PluginInfo> pluginInfoList = PluginInfoHolder.getAllPluginInfo();
        StringBuilder successPluginStr = new StringBuilder();
        pluginInfoList.forEach(pluginInfo -> successPluginStr.append("Success Load Plugin -> ").append(pluginInfo.getPluginPath()).append("\n"));
        String banner = """
                ----------------------------------------------------------------------------------
                                         __                     \s
                                        / _|                    \s
                  _ __     ___   _ __  | |_   _ __    ___    ___\s
                 | '_ \\   / _ \\ | '__| |  _| | '__|  / _ \\  / _ \\
                 | |_) | |  __/ | |    | |   | |    |  __/ |  __/
                 | .__/   \\___| |_|    |_|   |_|     \\___|  \\___|
                 | |                                            \s
                 |_|                                            \s
                 
                 %s
                 Successfully started!
                 access port: %s
                ----------------------------------------------------------------------------------
                """.formatted(successPluginStr, port);
        System.out.println(banner);
    }

    /**
     * 初始化文件上传处理类
     */
    private void initFileHandleCache() {
        FileHandleStorageHolder.putFileHandleStorage(0, new FileLocalHandleImpl());
        FileHandleStorageHolder.putFileHandleStorage(1, new FileS3HandleImpl());
    }
}
