package com.perfree.plugin.handle;

import com.perfree.plugin.PluginInfo;
import io.swagger.v3.oas.models.OpenAPI;
import org.springdoc.api.AbstractOpenApiResource;
import org.springdoc.core.models.GroupedOpenApi;
import org.springdoc.core.service.OpenAPIService;
import org.springdoc.webmvc.api.MultipleOpenApiResource;
import org.springdoc.webmvc.api.OpenApiResource;
import org.springframework.context.ApplicationContext;
import org.springframework.util.ReflectionUtils;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.List;

/**
 * @author Perfree
 * @description swagger处理
 * @date 15:46 2023/9/28
 */
public class SwaggerHandler implements BasePluginRegistryHandler{


    ApplicationContext applicationContext;


    public SwaggerHandler(ApplicationContext applicationContext) {
        this.applicationContext = applicationContext;
    }

    @Override
    public void initialize() throws Exception {
    }

    @Override
    public void registry(PluginInfo pluginInfo) throws Exception {
        System.out.println(1111);
    }

    @Override
    public void unRegistry(PluginInfo pluginInfo) throws Exception {
    }



}
