package com.perfree.plugin.annotation;

import java.lang.annotation.*;

/**
 * @author Perfree
 * @description 定义拦截器注解，用于插件
 * @date 15:34 2023/9/28
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
@Documented
public @interface InterceptPath {

	/** 拦截的路径 */
	String [] value();

}
