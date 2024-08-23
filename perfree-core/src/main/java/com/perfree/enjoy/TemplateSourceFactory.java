package com.perfree.enjoy;

import com.jfinal.template.source.ClassPathSourceFactory;
import com.jfinal.template.source.FileSourceFactory;
import com.jfinal.template.source.ISource;
import com.jfinal.template.source.ISourceFactory;
import com.perfree.commons.constant.SystemConstants;
import com.perfree.commons.utils.SpringBeanUtil;
import com.perfree.plugin.PluginInfo;
import com.perfree.plugin.PluginInfoHolder;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerExecutionChain;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

import java.io.File;
import java.net.URL;
import java.util.List;

/**
 * TemplateSource Configuration
 *
 * @author Perfree
 */
public class TemplateSourceFactory implements ISourceFactory {

    private final static Logger LOGGER = LoggerFactory.getLogger(TemplateSourceFactory.class);

    @Override
    public ISource getSource(String s, String s1, String s2) {
        URL resource = getClassLoader().getResource(buildClassPathFinalFileName(null, s1));
        if (resource != null) {
            return new ClassPathSourceFactory().getSource(null, s1, s2);
        }
        String finalFileName = buildResourceFinalFileName(SystemConstants.RESOURCES_DIR, s1);
        File file = new File(finalFileName);
        if (file.exists()) {
            return new FileSourceFactory().getSource(SystemConstants.RESOURCES_DIR, s1, s2);
        }


        try{
            HttpServletRequest request =((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
            RequestMappingHandlerMapping handlerMapping = SpringBeanUtil.context.getBean(RequestMappingHandlerMapping.class);
            HandlerExecutionChain handlerChain = handlerMapping.getHandler(request);
            if (handlerChain == null) {
                throw new IllegalArgumentException("File not found!");
            }
            HandlerMethod handler = (HandlerMethod) handlerChain.getHandler();
            Object bean = handler.getBean();
            ClassLoader classLoader = bean.getClass().getClassLoader();
            // 插件静态资源处理 todo
            List<PluginInfo> allPluginInfo = PluginInfoHolder.getAllPluginInfo();
            for (PluginInfo pluginInfo : allPluginInfo) {
                if (pluginInfo.getPluginClassLoader() == classLoader) {
                    return new FileSourceFactory().getSource(pluginInfo.getPluginPath() , s1, s2);
                }
            }
        }catch (Exception exception) {
            LOGGER.error("error render tpl", exception);
        }

        return null;
    }

    private String buildClassPathFinalFileName(String baseTemplatePath, String fileName) {
        String finalFileName;
        if (baseTemplatePath != null) {
            char firstChar = fileName.charAt(0);
            if (firstChar == '/' || firstChar == '\\') {
                finalFileName = baseTemplatePath + fileName;
            } else {
                finalFileName = baseTemplatePath + "/" + fileName;
            }
        } else {
            finalFileName = fileName;
        }

        if (finalFileName.charAt(0) == '/') {
            finalFileName = finalFileName.substring(1);
        }

        return finalFileName;
    }

    private String buildResourceFinalFileName(String baseTemplatePath, String fileName) {
        if (baseTemplatePath == null) {
            return fileName;
        }
        char firstChar = fileName.charAt(0);
        String finalFileName;
        if (firstChar == '/' || firstChar == '\\') {
            finalFileName = baseTemplatePath + fileName;
        } else {
            finalFileName = baseTemplatePath + File.separator + fileName;
        }
        return finalFileName;
    }

    private ClassLoader getClassLoader() {
        ClassLoader ret = Thread.currentThread().getContextClassLoader();
        return ret != null ? ret : getClass().getClassLoader();
    }
}
