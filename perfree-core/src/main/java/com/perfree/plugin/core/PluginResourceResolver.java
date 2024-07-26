package com.perfree.plugin.core;

import com.perfree.plugin.PluginInfo;
import com.perfree.plugin.PluginInfoHolder;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.FileUrlResource;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.resource.AbstractResourceResolver;
import org.springframework.web.servlet.resource.ResourceResolverChain;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class PluginResourceResolver extends AbstractResourceResolver {

    private final static Logger LOGGER = LoggerFactory.getLogger(PluginResourceResolver.class);
    @Override
    protected Resource resolveResourceInternal(HttpServletRequest request, String requestPath, List<? extends Resource> locations, ResourceResolverChain chain) {
        int startOffset = (requestPath.startsWith("/") ? 1 : 0);
        int endOffset = requestPath.indexOf('/', 1);
        if (endOffset != -1) {
            String pluginId = requestPath.substring(startOffset, endOffset);
            String partialPath = requestPath.substring(endOffset + 1);
            PluginInfo plugin = PluginInfoHolder.getPluginInfo(pluginId);

            if (plugin == null){
                return null;
            }

            // 从插件内置文件路径获取资源
            Resource resource = resolveClassPathFile(plugin, partialPath);
            if(resource != null){
                return resource;
            }

            // 从外置文件路径获取资源
            resource = resolveFilePath(plugin, partialPath);
            if(resource != null){
                return resource;
            }
            return null;

        }
        return chain.resolveResource(request, requestPath, locations);
    }

    @Override
    protected String resolveUrlPathInternal(String resourceUrlPath, List<? extends Resource> locations, ResourceResolverChain chain) {
        return null;
    }

    /**
     * 解决插件中配置的绝对文件路径的文件资源。也就是插件中定义的  file:D://xx/xx/ 配置
     * @param plugin 插件配置Bean
     * @param partialPath 部分路径
     * @return 资源。没有发现则返回null
     */
    private Resource resolveFilePath(PluginInfo plugin, String partialPath) {
        Set<String> filePaths = getStaticFileLocations( plugin.getPluginConfig().getPlugin().getStaticLocations());
        if(filePaths.isEmpty()){
            return null;
        }

        for (String filePath : filePaths) {
            Path fullPath = Paths.get(filePath + partialPath);
            if(!Files.exists(fullPath)){
                continue;
            }
            try {
                FileUrlResource fileUrlResource = new FileUrlResource(fullPath.toString());
                if(fileUrlResource.exists()){
                    return fileUrlResource;
                }
            } catch (Exception e) {
                LOGGER.debug("Get static resources of path '{}' error.", fullPath, e);
            }
        }
        return null;
    }

    /**
     * @description 从pluginResources获取插件文件(classpath原文件已解压至pluginResources文件夹)
     * @author Perfree
     * @date 2021/11/13 11:13
     */
    private Resource resolveClassPathFile(PluginInfo plugin, String partialPath) {
        Set<String> filePaths = getStaticClassPathLocations(plugin.getPluginConfig().getPlugin().getStaticLocations());
        if(filePaths.isEmpty()){
            return null;
        }

        for (String filePath : filePaths) {
            Path fullPath = Paths.get(plugin.getPluginPath() +
                    File.separator + filePath + partialPath);
            if(!Files.exists(fullPath)){
                continue;
            }
            try {
                FileUrlResource fileUrlResource = new FileUrlResource(fullPath.toString());
                if(fileUrlResource.exists()){
                    return fileUrlResource;
                }
            } catch (Exception e) {
                LOGGER.debug("Get static resources of path '{}' error.", fullPath, e);
            }
        }
        return null;
    }

    private Set<String> getStaticFileLocations(String locations) {
        Set<String> result = new HashSet<>();
        String[] staticLocations = locations.split(",");
        for (String staticLocation : staticLocations) {
            if (!staticLocation.contains("classpath:")){
                result.add(staticLocation);

            }
        }
        return result;
    }

    private Set<String> getStaticClassPathLocations(String locations) {
        Set<String> result = new HashSet<>();
        String[] staticLocations = locations.split(",");
        for (String staticLocation : staticLocations) {
            if (staticLocation.contains("classpath:")){
                staticLocation = staticLocation.replace("classpath:", "");
                if (StringUtils.isNotBlank(staticLocation) && staticLocation.startsWith("/")){
                    staticLocation = staticLocation.substring(1);
                }
                result.add(staticLocation);
            }
        }
        return result;
    }
}
