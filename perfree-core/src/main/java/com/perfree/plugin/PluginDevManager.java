package com.perfree.plugin;

import com.perfree.commons.constant.SystemConstants;
import com.perfree.constant.PluginConstant;
import com.perfree.plugin.commons.PluginHandleUtils;
import com.perfree.plugin.handle.compound.PluginHandle;
import com.perfree.plugin.pojo.PluginBaseConfig;
import com.perfree.system.api.plugin.dto.PluginsDTO;
import org.apache.maven.model.Model;
import org.apache.maven.model.io.xpp3.MavenXpp3Reader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Perfree
 * @description 源码运行插件加载类
 * @date 15:36 2023/01/18
 */
@Component
public class PluginDevManager {
    private static final Logger LOGGER = LoggerFactory.getLogger(PluginDevManager.class);

    private final PluginHandle pluginHandle;
    private final PluginManager pluginManager;

    public PluginDevManager(PluginHandle pluginHandle, PluginManager pluginManager) {
        this.pluginHandle = pluginHandle;
        this.pluginManager = pluginManager;
    }


    /**
     * 初始化插件
     */
    public PluginBaseConfig initPlugin(String pluginPath, PluginsDTO pluginsDTO) throws Exception {
        PluginBaseConfig pluginConfig = PluginHandleUtils.getDevPluginConfig(pluginPath);
        if (null == pluginConfig) {
            LOGGER.error("{} plugin.yaml not found", pluginPath);
            return null;
        }

        // 记录是否更新及是否存在标识
        boolean update = false;
        boolean isExist = false;
        PluginBaseConfig installedPluginConfig = PluginHandleUtils.getInstalledPluginConfig(pluginConfig.getPlugin().getId());
        if (null != installedPluginConfig) {
            isExist = true;
            long oldVersion = PluginHandleUtils.versionToLong(installedPluginConfig.getPlugin().getVersion());
            long newVersion = PluginHandleUtils.versionToLong(pluginConfig.getPlugin().getVersion());
            if (newVersion > oldVersion) {
                update = true;
            }
        }

        // 如果存在该插件,先停止
        if (isExist && PluginInfoHolder.getPluginInfo(pluginConfig.getPlugin().getId()) != null) {
            pluginManager.stopPlugin(pluginConfig.getPlugin().getId());
        }

        // 拷贝资源文件
        File pluginDir = PluginHandleUtils.devCopyPluginToPluginDir(pluginPath, SystemConstants.PLUGINS_DIR);

        // 启动插件
        PluginInfo pluginInfo = pluginHandle.startPlugin(pluginDir);

        // 获取插件事件Bean
        BasePluginEvent bean = PluginApplicationContextHolder.getPluginBean(pluginInfo.getPluginId(), BasePluginEvent.class);
        pluginConfig.setStatus(PluginConstant.PLUGIN_STATUS_ENABLE);

        // 如果是更新,执行更新sql, 回调更新事件
        if (update) {
            PluginHandleUtils.execPluginUpdateSql(pluginDir, installedPluginConfig.getPlugin().getVersion(), pluginConfig.getPlugin().getVersion());
            if (null != bean) {
                bean.onUpdate();
            }
            pluginConfig.setStatus(PluginConstant.PLUGIN_STATUS_ENABLE);
            return pluginConfig;
        }

        // 如果不存在,执行安装sql,回调安装事件
        if (!isExist) {
            PluginHandleUtils.execPluginInstallSql(pluginDir);
            if (null != bean) {
                bean.onInstall();
            }
        }

        // 如果数据库存储的插件信息为禁用,则停掉该插件
        if (null != pluginsDTO && pluginsDTO.getStatus().equals(PluginConstant.PLUGIN_STATUS_DISABLE)) {
            pluginHandle.stopPlugin(pluginInfo.getPluginId());
            pluginConfig.setStatus(PluginConstant.PLUGIN_STATUS_DISABLE);
        }
        return pluginConfig;
    }

    /**
     * 获取启用的插件
     *
     * @return List<String>
     */
    private List<String> getEnablePlugin(File pluginsPom) {
        try (FileInputStream fileInputStream = new FileInputStream(pluginsPom)) {
            MavenXpp3Reader mavenXpp3Reader = new MavenXpp3Reader();
            Model model = mavenXpp3Reader.read(fileInputStream);
            return model.getModules();
        } catch (Exception e) {
            LOGGER.error("Failed parse plugin pom.xml", e);
        }
        return null;
    }


    public List<String> getPluginClassPath() {
        String projectRootPath = System.getProperty("user.dir");
        File pluginsPom = new File(projectRootPath + "/perfree-plugins/pom.xml");
        File pluginsDir = new File(projectRootPath + "/perfree-plugins");
        File[] files = pluginsDir.listFiles();
        if (null == files) {
            return null;
        }
        List<String> pluginPaths = new ArrayList<>();
        List<String> enablePlugins = getEnablePlugin(pluginsPom);
        if (null == enablePlugins || enablePlugins.isEmpty()) {
            return null;
        }
        for (File file : files) {
            if (file.isDirectory()) {
                File pluginPom = new File(file.getAbsoluteFile() + "/pom.xml");
                String pluginArtifactId = getPluginArtifactId(pluginPom);
                if (enablePlugins.contains(pluginArtifactId)) {
                    pluginPaths.add(file.getAbsoluteFile() + "/target");
                }
            }
        }
        return pluginPaths;
    }

    /**
     * 获取插件ArtifactId
     *
     * @param pomFilePath pomFilePath
     * @return String
     */
    private String getPluginArtifactId(File pomFilePath) {
        try (FileInputStream fileInputStream = new FileInputStream(pomFilePath)) {
            MavenXpp3Reader mavenXpp3Reader = new MavenXpp3Reader();
            Model model = mavenXpp3Reader.read(fileInputStream);
            return model.getArtifactId();
        } catch (Exception e) {
            LOGGER.error("Failed parse plugin pom.xml", e);
        }
        return null;
    }
}
