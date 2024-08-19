package com.perfree.plugin.handle;

import com.perfree.plugin.PluginApplicationContextHolder;
import com.perfree.plugin.PluginInfo;
import org.springdoc.api.AbstractOpenApiResource;
import org.springdoc.core.configurer.SpringdocActuatorBeanFactoryConfigurer;
import org.springdoc.core.configurer.SpringdocBeanFactoryConfigurer;
import org.springdoc.core.models.GroupedOpenApi;
import org.springdoc.core.properties.AbstractSwaggerUiConfigProperties;
import org.springdoc.core.properties.SwaggerUiConfigParameters;
import org.springdoc.core.properties.SwaggerUiConfigProperties;
import org.springdoc.core.providers.SpringDocProviders;
import org.springdoc.core.service.OpenAPIService;
import org.springdoc.webmvc.api.MultipleOpenApiResource;
import org.springdoc.webmvc.api.OpenApiResource;
import org.springdoc.webmvc.ui.SwaggerConfigResource;
import org.springdoc.webmvc.ui.SwaggerWelcomeCommon;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.util.ReflectionUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.RequestMappingInfo;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;

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
      /*  // 获取包含Controller/RestController注解的类,将其中的接口进行注册
        registryOpenApi(pluginInfo);
        OpenAPIService openAPIService = applicationContext.getBean(OpenAPIService.class);*/
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
              /*  openAPIService.addMappings(Map.of(bean.toString(), bean));*/
            }
        }
       /* SpringDocProviders bean = applicationContext.getBean(SpringDocProviders.class);
        SpringdocBeanFactoryConfigurer.initBeanFactoryPostProcessor(PluginApplicationContextHolder.getApplicationContext(pluginInfo.getPluginId()).getBeanFactory());*/
    }

    @Override
    public void unRegistry(PluginInfo pluginInfo) throws Exception {
      /*  OpenAPIService openAPIService = null;
        if (null != pluginInfo.getPluginConfig().getSpringdoc()) {
            openAPIService = getOpenAPIServiceByGroupName(pluginInfo.getPluginConfig().getSpringdoc().getGroupName());
        }*/
        for (Class<?> aClass : pluginInfo.getClassList()) {
           /* if (null != openAPIService) {
                Map<String, Object> mappingsMap = openAPIService.getMappingsMap();
                mappingsMap.remove(aClass.toString());
            }*/
            Controller controller = aClass.getAnnotation(Controller.class);
            RestController restController = aClass.getAnnotation(RestController.class);
            if (controller != null || restController != null) {
                Method[] methods = aClass.getMethods();
                for (Method method : methods) {
                    RequestMappingInfo requestMappingInfo = (RequestMappingInfo) getMappingForMethod.invoke(requestMappingHandlerMapping, method, aClass);
                    requestMappingHandlerMapping.unregisterMapping(requestMappingInfo);
                }
            }
        }
  /*      if (null != openAPIService) {
            openAPIService.build(Locale.CHINA);
        }
        unRegistryOpenApi(pluginInfo);
        OpenAPIService openAPIService2 = applicationContext.getBean(OpenAPIService.class);
        openAPIService2.build(Locale.CHINA);*/
    }


    private void unRegistryOpenApi(PluginInfo plugin) throws Exception {
        if (null == plugin.getPluginConfig().getSpringdoc()) {
            return;
        }
        MultipleOpenApiResource bean = applicationContext.getBean(MultipleOpenApiResource.class);
        Field groupedOpenApis = MultipleOpenApiResource.class.getDeclaredField("groupedOpenApis");
        ReflectionUtils.makeAccessible(groupedOpenApis);
        List<GroupedOpenApi> groupedOpenApiList = (List<GroupedOpenApi>)groupedOpenApis.get(bean);
        for (int i = groupedOpenApiList.size() -1; i >= 0; i--) {
            if (groupedOpenApiList.get(i).getGroup().equals( plugin.getPluginConfig().getSpringdoc().getGroupName())) {
                groupedOpenApiList.remove(i);
            }
        }
        groupedOpenApis.set(bean, groupedOpenApiList);
        bean.afterPropertiesSet();
    }


    private OpenAPIService registryOpenApi(PluginInfo plugin) throws Exception {
        if (null == plugin.getPluginConfig().getSpringdoc()) {
            return null;
        }
        MultipleOpenApiResource bean = applicationContext.getBean(MultipleOpenApiResource.class);
        Field groupedOpenApis = MultipleOpenApiResource.class.getDeclaredField("groupedOpenApis");
        ReflectionUtils.makeAccessible(groupedOpenApis);
        List<GroupedOpenApi> groupedOpenApiList = (List<GroupedOpenApi>)groupedOpenApis.get(bean);
        for (GroupedOpenApi groupedOpenApi : groupedOpenApiList) {
            if (groupedOpenApi.getGroup().equals(plugin.getPluginConfig().getSpringdoc().getGroupName())) {
                return getOpenAPIServiceByGroupName(plugin.getPluginConfig().getSpringdoc().getGroupName());
            }
        }
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
        return getOpenAPIServiceByGroupName(plugin.getPluginConfig().getSpringdoc().getGroupName());
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
