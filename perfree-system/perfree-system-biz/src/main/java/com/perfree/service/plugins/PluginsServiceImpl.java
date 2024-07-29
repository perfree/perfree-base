package com.perfree.service.plugins;

import cn.hutool.core.io.FileUtil;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.perfree.commons.common.PageResult;
import com.perfree.commons.constant.SystemConstants;
import com.perfree.commons.exception.ServiceException;
import com.perfree.constant.PluginConstant;
import com.perfree.controller.auth.plugins.vo.PluginsPageReqVO;
import com.perfree.convert.plugins.PluginsConvert;
import com.perfree.enums.ErrorCode;
import com.perfree.mapper.MenuMapper;
import com.perfree.mapper.PluginsMapper;
import com.perfree.model.Plugins;
import com.perfree.plugin.PluginDevManager;
import com.perfree.plugin.PluginInfo;
import com.perfree.plugin.PluginInfoHolder;
import com.perfree.plugin.PluginManager;
import com.perfree.plugin.commons.PluginHandleUtils;
import com.perfree.plugin.pojo.PluginBaseConfig;
import com.perfree.system.api.plugin.dto.PluginsDTO;
import jakarta.annotation.Resource;
import lombok.SneakyThrows;
import org.apache.commons.io.monitor.FileAlterationListener;
import org.apache.commons.io.monitor.FileAlterationMonitor;
import org.apache.commons.io.monitor.FileAlterationObserver;
import org.jetbrains.annotations.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author perfree
 * @since 2023-09-27
 */
@Service
public class PluginsServiceImpl extends ServiceImpl<PluginsMapper, Plugins> implements PluginsService {
    private final static Logger LOGGER = LoggerFactory.getLogger(PluginsServiceImpl.class);

    @Value("${perfree.autoLoadDevPlugin}")
    private Boolean autoLoadDevPlugin;

    @Value("${perfree.autoLoadDevPluginTime}")
    private Long autoLoadDevPluginTime;

    @Resource
    private PluginsMapper pluginsMapper;

    @Resource
    private PluginManager pluginManager;

    @Resource
    private PluginDevManager pluginDevManager;

    @Resource
    private MenuMapper menuMapper;


    @Override
    public PageResult<Plugins> pluginsPage(PluginsPageReqVO pageVO) {
        return pluginsMapper.selectPage(pageVO);
    }

    @Override
    public Boolean installPlugin(MultipartFile file) {
        try {
            File dir = new File(SystemConstants.UPLOAD_TEMP_PATH);
            if (!dir.exists()) {
                FileUtil.mkdir(dir.getAbsolutePath());
            }
            File pluginFile = new File(dir.getAbsolutePath() + File.separator + file.getOriginalFilename());
            file.transferTo(pluginFile);
            savePluginsHandle(pluginManager.installPlugin(pluginFile));
            return true;
        } catch (Exception e) {
            LOGGER.error("插件安装失败", e);
            throw new RuntimeException(e);
        }
    }

    @Override
    public void watchMonitorDevPlugins() {
        String command = System.getProperty("sun.java.command");
        if (command != null && !command.contains(".jar") && autoLoadDevPlugin) {
            // 源码运行,且开启了插件监听,自动监听插件 TODO 不是很完美,需要改动
            List<String> pluginsList = pluginDevManager.getPluginClassPath();
            if (null == pluginsList || pluginsList.isEmpty()) {
                return;
            }
            for (String plugin : pluginsList) {
                try {
                    initDevPlugin(plugin);
                    FileAlterationObserver fileAlterationObserver = new FileAlterationObserver(plugin);
                    fileAlterationObserver.addListener(new FileAlterationListener() {

                        private Boolean flag = false;

                        @Override
                        public void onStart(FileAlterationObserver fileAlterationObserver) {
                            flag = false;
                        }

                        @Override
                        public void onDirectoryCreate(File file) {
                            flag = true;
                        }

                        @Override
                        public void onDirectoryChange(File file) {
                            flag = true;
                        }

                        @Override
                        public void onDirectoryDelete(File file) {
                            flag = true;
                        }

                        @Override
                        public void onFileCreate(File file) {
                            flag = true;
                        }

                        @Override
                        public void onFileChange(File file) {
                            flag = true;
                        }

                        @Override
                        public void onFileDelete(File file) {
                            flag = true;
                        }

                        @SneakyThrows
                        @Override
                        public void onStop(FileAlterationObserver fileAlterationObserver) {
                            if (flag) {
                                LOGGER.info(plugin + ": 插件代码文件发生改变");
                                initDevPlugin(plugin);
                            }
                        }
                    });
                    FileAlterationMonitor fileAlterationMonitor = new FileAlterationMonitor(autoLoadDevPluginTime);
                    fileAlterationMonitor.addObserver(fileAlterationObserver);
                    fileAlterationMonitor.start();
                } catch (Exception e) {
                    LOGGER.error("初始化开发环境插件出错或动态更新开发环境插件出错", e);
                }
            }
        }
    }

    private synchronized void initDevPlugin (String pluginPath) throws Exception {
        PluginBaseConfig pluginConfig = PluginHandleUtils.getDevPluginConfig(pluginPath);
        if (null == pluginConfig) {
            LOGGER.error("{} plugin.yaml not found", pluginPath);
            return;
        }
        Plugins plugins = pluginsMapper.getByPluginId(pluginConfig.getPlugin().getId());
        if (null != plugins && plugins.getStatus().equals(PluginConstant.PLUGIN_STATUS_DISABLE)) {
            return;
        }
        PluginsDTO pluginsDTO = PluginsConvert.INSTANCE.convertToDTO(plugins);
        savePluginsHandle(pluginDevManager.initPlugin(pluginPath, pluginsDTO));
    }

    @Override
    @Transactional
    public void initPlugins() {
        List<Plugins> pluginsList = pluginsMapper.getAllEnablePlugins();
        for (Plugins plugins : pluginsList) {
            PluginInfo pluginInfo = PluginInfoHolder.getPluginInfo(plugins.getPluginId());
            if (null == pluginInfo) {
                File pluginDirFile = new File(SystemConstants.PLUGINS_DIR + SystemConstants.FILE_SEPARATOR + plugins.getPluginId());
                if (pluginDirFile.exists()) {
                    pluginManager.runPlugin(pluginDirFile);
                } else {
                    // 可能是冗余数据,删掉
                    pluginsMapper.delByPluginId(plugins.getPluginId());
                    menuMapper.deleteMenuByPluginId(plugins.getPluginId());
                }
            }
        }
    }

    @Override
    @Transactional
    public Boolean disablePlugin(Integer id) {
        Plugins plugins = pluginsMapper.selectById(id);
        if (null != PluginInfoHolder.getPluginInfo(plugins.getPluginId())) {
            pluginManager.stopPlugin(plugins.getPluginId());
        }
        plugins.setStatus(PluginConstant.PLUGIN_STATUS_DISABLE);
        pluginsMapper.updateById(plugins);
        return true;
    }

    @Override
    @Transactional
    public Boolean enablePlugin(Integer id) {
        Plugins plugins = pluginsMapper.selectById(id);
        File pluginDirFile = new File(SystemConstants.PLUGINS_DIR + SystemConstants.FILE_SEPARATOR + plugins.getPluginId());
        if (pluginDirFile.exists()) {
            if (null == PluginInfoHolder.getPluginInfo(plugins.getPluginId())) {
                pluginManager.runPlugin(pluginDirFile);
            }
            plugins.setStatus(PluginConstant.PLUGIN_STATUS_ENABLE);
            pluginsMapper.updateById(plugins);
            return true;
        } else {
            // 可能是冗余数据,删掉
            pluginsMapper.delByPluginId(plugins.getPluginId());
            throw new ServiceException(ErrorCode.PLUGIN_FILE_NOT_EXIST);
        }
    }

    @Override
    public Boolean unInstallPlugin(Integer id) {
        Plugins plugins = pluginsMapper.selectById(id);
        if (null != PluginInfoHolder.getPluginInfo(plugins.getPluginId())) {
            throw new ServiceException(ErrorCode.PLUGIN_IS_RUN);
        }
        File pluginDirFile = new File(SystemConstants.PLUGINS_DIR + SystemConstants.FILE_SEPARATOR + plugins.getPluginId());
        if (pluginDirFile.exists()) {
            try {
                pluginManager.unInstallPlugin(pluginDirFile);
                pluginsMapper.delByPluginId(plugins.getPluginId());
                return true;
            } catch (Exception e) {
                LOGGER.error("插件卸载失败", e);
                return false;
            }
        } else {
            // 可能是冗余数据,删掉
            pluginsMapper.delByPluginId(plugins.getPluginId());
            throw new ServiceException(ErrorCode.PLUGIN_FILE_NOT_EXIST);
        }
    }

    /**
     * 保存插件逻辑
     * @param pluginBaseConfig pluginBaseConfig
     */
    private void savePluginsHandle(PluginBaseConfig pluginBaseConfig) {
        pluginsMapper.delByPluginId(pluginBaseConfig.getPlugin().getId());
        Plugins plugins = getPlugins(pluginBaseConfig);
        pluginsMapper.insert(plugins);
    }

    @NotNull
    private static Plugins getPlugins(PluginBaseConfig pluginBaseConfig) {
        Plugins plugins = new Plugins();
        plugins.setName(pluginBaseConfig.getPlugin().getName());
        plugins.setPluginId(pluginBaseConfig.getPlugin().getId());
        plugins.setDesc(pluginBaseConfig.getPlugin().getDescription());
        plugins.setVersion(pluginBaseConfig.getPlugin().getVersion());
        plugins.setAuthor(pluginBaseConfig.getAuthor().getName());
        plugins.setWebsite(pluginBaseConfig.getAuthor().getWebSite());
        plugins.setEmail(pluginBaseConfig.getAuthor().getEmail());
        plugins.setStatus(pluginBaseConfig.getStatus());
        return plugins;
    }
}
