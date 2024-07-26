package com.perfree.plugin.handle;

import com.perfree.plugin.PluginApplicationContextHolder;
import com.perfree.plugin.PluginInfo;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.util.ReflectionUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.RequestMappingInfo;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Perfree
 * @description controller处理
 * @date 15:46 2023/9/28
 */
public class ControllerHandler implements BasePluginRegistryHandler{

    RequestMappingHandlerMapping requestMappingHandlerMapping;

    ApplicationContext applicationContext;

    Method getMappingForMethod;


    public ControllerHandler(ApplicationContext applicationContext) {
        this.applicationContext = applicationContext;
    }

    @Override
    public void initialize() throws Exception {
        requestMappingHandlerMapping = applicationContext.getBean(RequestMappingHandlerMapping.class);
        getMappingForMethod = ReflectionUtils.findMethod(RequestMappingHandlerMapping.class, "getMappingForMethod", Method.class, Class.class);
        if (null != getMappingForMethod) {
            getMappingForMethod.setAccessible(true);
        }
    }

    @Override
    public void registry(PluginInfo pluginInfo) throws Exception {
        // 获取包含Controller/RestController注解的类,将其中的接口进行注册
        for (Class<?> aClass : pluginInfo.getClassList()) {
            Controller controller = aClass.getAnnotation(Controller.class);
            RestController restController = aClass.getAnnotation(RestController.class);
            if(controller != null || restController != null) {
                Object bean = PluginApplicationContextHolder.getApplicationContext(pluginInfo.getPluginId()).getBean(aClass);
                Method[] methods = aClass.getMethods();
                for (Method method : methods) {
                    if (method.getAnnotation(RequestMapping.class) != null
                            || method.getAnnotation(GetMapping.class) != null
                            || method.getAnnotation(PostMapping.class) != null
                            || method.getAnnotation(DeleteMapping.class) != null
                            || method.getAnnotation(PutMapping.class) != null
                            || method.getAnnotation(PatchMapping.class) != null) {
                        RequestMappingInfo requestMappingInfo = (RequestMappingInfo) getMappingForMethod.invoke(requestMappingHandlerMapping, method, aClass);
                        // 注册路由
                        requestMappingHandlerMapping.registerMapping(requestMappingInfo, bean, method);
                    }
                }
            }
        }
    }

    @Override
    public void unRegistry(PluginInfo pluginInfo) throws Exception {
        for (RequestMappingInfo requestMappingInfo : getRequestMappingInfo(pluginInfo)) {
            // 取消注册
            requestMappingHandlerMapping.unregisterMapping(requestMappingInfo);
        }
    }


    /**
     * 根据插件信息获取RequestMappingInfo集合
     * @author perfree
     * @date 2023-09-27 16:09:11
     * @param plugin PluginInfo
     * @return java.util.List<org.springframework.web.servlet.mvc.method.RequestMappingInfo>
     */
    private List<RequestMappingInfo> getRequestMappingInfo(PluginInfo plugin) throws Exception {
        List<RequestMappingInfo> requestMappingInfoList = new ArrayList<>();
        for (Class<?> aClass : plugin.getClassList()) {
            Controller controller = aClass.getAnnotation(Controller.class);
            RestController restController = aClass.getAnnotation(RestController.class);
            if (controller != null || restController != null) {
                Method[] methods = aClass.getMethods();
                for (Method method : methods) {
                    RequestMappingInfo requestMappingInfo = (RequestMappingInfo) getMappingForMethod.invoke(requestMappingHandlerMapping, method, aClass);
                    requestMappingInfoList.add(requestMappingInfo);
                }
            }
        }
        return requestMappingInfoList;
    }
}
