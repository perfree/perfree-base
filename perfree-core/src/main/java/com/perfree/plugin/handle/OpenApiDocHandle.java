package com.perfree.plugin.handle;

import cn.hutool.core.util.ReflectUtil;
import com.perfree.plugin.PluginInfo;
import org.springdoc.api.AbstractOpenApiResource;
import org.springdoc.core.properties.SpringDocConfigProperties;
import org.springdoc.core.service.OpenAPIService;
import org.springframework.context.ApplicationContext;
import org.springframework.web.bind.annotation.RestController;

import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Locale;

public class OpenApiDocHandle implements BasePluginRegistryHandler{

    private final static Class<?>[] REGISTER_ANNO = {RestController.class};
    ApplicationContext applicationContext;

    private OpenAPIService openApiService;
    private List<Class<?>> restControllers;

    private SpringDocConfigProperties springDocConfigProperties;

    public OpenApiDocHandle(ApplicationContext applicationContext) {
        this.applicationContext = applicationContext;
    }
    @Override
    public void initialize() throws Exception {
        openApiService = applicationContext.getBean(OpenAPIService.class);
        AbstractOpenApiResource openApiResource = applicationContext.getBean(AbstractOpenApiResource.class);
        Field additionalRestControllers = ReflectUtil.getField(openApiResource.getClass(), "ADDITIONAL_REST_CONTROLLERS");
        additionalRestControllers.setAccessible(true);
        restControllers = (List<Class<?>>) additionalRestControllers.get(null);
        springDocConfigProperties = applicationContext.getBean(SpringDocConfigProperties.class);
    }

    @Override
    public void registry(PluginInfo pluginInfo) throws Exception {
        List<Class<?>> pluginClassList = pluginInfo.getClassList().stream().filter(item -> !item.isInterface()).toList();
        if(!pluginClassList.isEmpty()) {
            for (Class<?> aClass : pluginClassList) {
                Annotation[] annotations = aClass.getAnnotations();
                if (annotations.length > 0 && Collections.disjoint(Arrays.asList(annotations), Arrays.asList(REGISTER_ANNO))) {
                    restControllers.add(aClass);
                }
            }
        }
        openApiService.setCachedOpenAPI(null, Locale.getDefault());
        openApiService.build(Locale.getDefault());
    }

    @Override
    public void unRegistry(PluginInfo pluginInfo) throws Exception {
        List<Class<?>> pluginClassList = pluginInfo.getClassList().stream().filter(item -> !item.isInterface()).toList();
        if(!pluginClassList.isEmpty()) {
            for (Class<?> aClass : pluginClassList) {
                Annotation[] annotations = aClass.getAnnotations();
                if (annotations.length > 0 && Collections.disjoint(Arrays.asList(annotations), Arrays.asList(REGISTER_ANNO))) {
                    restControllers.remove(aClass);
                }
            }
        }
        openApiService.setCachedOpenAPI(null, Locale.getDefault());
        openApiService.build(Locale.getDefault());
    }

}
