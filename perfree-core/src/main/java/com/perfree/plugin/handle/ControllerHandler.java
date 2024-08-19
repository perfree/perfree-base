package com.perfree.plugin.handle;

import com.perfree.plugin.PluginApplicationContextHolder;
import com.perfree.plugin.PluginInfo;
import org.springdoc.api.AbstractOpenApiResource;
import org.springdoc.core.service.OpenAPIService;
import org.springdoc.webmvc.api.MultipleOpenApiResource;
import org.springdoc.webmvc.api.OpenApiResource;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.util.ReflectionUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.RequestMappingInfo;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

import java.lang.reflect.Field;
import java.lang.reflect.Method;

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
        // OpenAPIService openAPIService = getOpenAPIServiceByGroupName("other");
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
               // openAPIService.addMappings(Map.of(bean.toString(), bean));
            }
        }
       // openAPIService.setCachedOpenAPI(openAPIService.build(Locale.getDefault()), Locale.getDefault());
    }

    @Override
    public void unRegistry(PluginInfo pluginInfo) throws Exception {
        // OpenAPIService openAPIService = getOpenAPIServiceByGroupName("other");
        for (Class<?> aClass : pluginInfo.getClassList()) {
            Controller controller = aClass.getAnnotation(Controller.class);
            RestController restController = aClass.getAnnotation(RestController.class);
            if (controller != null || restController != null) {
                // openAPIService.getMappingsMap().remove(bean.toString());

                Method[] methods = aClass.getMethods();
                for (Method method : methods) {
                    RequestMappingInfo requestMappingInfo = (RequestMappingInfo) getMappingForMethod.invoke(requestMappingHandlerMapping, method, aClass);
                    requestMappingHandlerMapping.unregisterMapping(requestMappingInfo);
                }
            }
        }
       // openAPIService.setCachedOpenAPI(openAPIService.build(Locale.getDefault()), Locale.getDefault());
    }

    private OpenAPIService getOpenAPIServiceByGroupName(String groupName) throws Exception {
        MultipleOpenApiResource bean = applicationContext.getBean(MultipleOpenApiResource.class);
        //反射获取openApiResource
        Method getOpenApiResource = MultipleOpenApiResource.class.getDeclaredMethod("getOpenApiResourceOrThrow", String.class);
        ReflectionUtils.makeAccessible(getOpenApiResource);
        OpenApiResource openApiResource = (OpenApiResource) getOpenApiResource.invoke(bean, groupName);

        // 反射获取 openAPIService
        Field openAPIServiceField = AbstractOpenApiResource.class.getDeclaredField("openAPIService");
        ReflectionUtils.makeAccessible(openAPIServiceField);
        return (OpenAPIService) openAPIServiceField.get(openApiResource);
    }
}
