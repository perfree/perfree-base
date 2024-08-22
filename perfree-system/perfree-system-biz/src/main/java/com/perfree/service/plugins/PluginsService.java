package com.perfree.service.plugins;

import com.baomidou.mybatisplus.extension.service.IService;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.plugins.vo.PluginsPageReqVO;
import com.perfree.model.Plugins;
import org.springframework.web.multipart.MultipartFile;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author perfree
 * @since 2023-09-27
 */
public interface PluginsService extends IService<Plugins> {

    /**
     * 插件分页列表
     * @param pageVO pageVO
     * @return PageResult<Plugins>
     */
    PageResult<Plugins> pluginsPage(PluginsPageReqVO pageVO);

    /**
     * 安装插件
     * @param file file
     * @return Boolean
     */
    Boolean installPlugin(MultipartFile file);

    /**
     * 监控开发环境插件变更
     */
    void watchMonitorDevPlugins() throws Exception;

    /**
     * 初始化插件
     */
    void initPlugins();


    /**
     * 禁用插件
     * @param pluginId pluginId
     * @return Boolean
     */
    Boolean disablePlugin(String pluginId);

    /**
     * 启用插件
     * @param pluginId pluginId
     * @return Boolean
     */
    Boolean enablePlugin(String pluginId);

    /**
     * 卸载插件
     * @param pluginId pluginId
     * @return Boolean
     */
    Boolean unInstallPlugin(String pluginId);

    Long getTotalPlugins();

}
