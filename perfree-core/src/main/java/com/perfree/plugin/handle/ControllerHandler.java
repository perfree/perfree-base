package com.perfree.plugin.handle;

import com.perfree.plugin.PluginApplicationContextHolder;
import com.perfree.plugin.PluginInfo;
import org.springdoc.api.AbstractOpenApiResource;
import org.springdoc.core.models.GroupedOpenApi;
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
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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
        OpenAPIService openApiService = getOpenApiService(pluginInfo);
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
                if (null != openApiService) {
                    openApiService.addMappings(Map.of(bean.toString(), bean));
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


    private OpenAPIService getOpenApiService(PluginInfo plugin) throws Exception {
        if (null == plugin.getPluginConfig().getSpringdoc()) {
            return null;
        }
        MultipleOpenApiResource bean = applicationContext.getBean(MultipleOpenApiResource.class);
        Field groupedOpenApis = MultipleOpenApiResource.class.getDeclaredField("groupedOpenApis");
        ReflectionUtils.makeAccessible(groupedOpenApis);
        List<GroupedOpenApi> groupedOpenApiList = (List<GroupedOpenApi>)groupedOpenApis.get(bean);
        GroupedOpenApi groupedOpenApi = GroupedOpenApi.builder()
                .group(plugin.getPluginConfig().getSpringdoc().getGroupName())
                .packagesToScan(plugin.getPluginConfig().getSpringdoc().getPackagesToScan())
                .pathsToMatch(plugin.getPluginConfig().getSpringdoc().getPathsToMatch())
                .displayName(plugin.getPluginConfig().getSpringdoc().getGroupName())
                .addOpenApiCustomizer(groupedOpenApiList.get(0).getOpenApiCustomizers().get(0))
                .addOperationCustomizer(groupedOpenApiList.get(0).getOperationCustomizers().get(0))
                .build();
        groupedOpenApiList.add(groupedOpenApi);
        groupedOpenApis.set(bean, groupedOpenApiList);
        bean.afterPropertiesSet();
        //反射获取openApiResource
        Method getOpenApiResource = MultipleOpenApiResource.class.getDeclaredMethod("getOpenApiResourceOrThrow", String.class);
        ReflectionUtils.makeAccessible(getOpenApiResource);
        OpenApiResource openApiResource = (OpenApiResource) getOpenApiResource.invoke(bean, plugin.getPluginConfig().getSpringdoc().getGroupName());

        // 反射获取 openAPIService
        Field openAPIServiceField = AbstractOpenApiResource.class.getDeclaredField("openAPIService");
        ReflectionUtils.makeAccessible(openAPIServiceField);
        return (OpenAPIService) openAPIServiceField.get(openApiResource);
    }
}
