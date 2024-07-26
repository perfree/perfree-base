package com.perfree;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FullyQualifiedAnnotationBeanNameGenerator;

/**
 * @author Perfree
 * @description Application: 程序入口
 * @date 15:41 2023/9/28
 */
// @SpringBootApplication(exclude = { DataSourceAutoConfiguration.class }) TODO 界面完善后再处理安装逻辑
@SpringBootApplication
@ComponentScan(nameGenerator = FullyQualifiedAnnotationBeanNameGenerator.class)
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
