package com.perfree.enjoy;

import com.jfinal.template.Engine;
import org.dromara.hutool.core.text.StrUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class EnjoyConfig {

    @Value("${version}")
    private String version;

    public static JFinalViewResolver jfr = null;


    @Bean(name = "jfinalViewResolver")
    public JFinalViewResolver getJFinalViewResolver() {
        jfr = new JFinalViewResolver();
        jfr.setContentType("text/html;charset=UTF-8");
        jfr.setOrder(0);
        jfr.setSessionInView(true);
        Engine engine = JFinalViewResolver.engine;
        engine.setDevMode(true);
        engine.setSourceFactory(new TemplateSourceFactory());
        engine.addSharedMethod(new StrUtil());
        engine.setCompressorOn('\n');
        Engine.setFastMode(true);
        Engine.setChineseExpression(true);
        return jfr;
    }
}
