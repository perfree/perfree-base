package com.perfree.plugin;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * @author Perfree
 * @description 定义AnnotationConfigApplicationContext管理集合
 * @date 15:35 2023/9/28
 */
public abstract class PluginApplicationContextHolder {

	private final static Map<String, AnnotationConfigApplicationContext> pluginApplicationMap = new ConcurrentHashMap<>();

	/**
	 * 新增AnnotationConfigApplicationContext
	 * @author perfree
	 * @date 2023-09-27 14:09:07
	 * @param pluginId 插件id
	 * @param applicationContext 插件AnnotationConfigApplicationContext
	 */
	public static void addPluginApplicationContext(String pluginId, AnnotationConfigApplicationContext applicationContext) {
		pluginApplicationMap.put(pluginId, applicationContext);
	}

	/**
	 * 根据插件id移除AnnotationConfigApplicationContext
	 * @author perfree
	 * @date 2023-09-27 14:09:44
	 * @param pluginId 插件id
	 */
	public static void removePluginApplicationContext(String pluginId) {
		AnnotationConfigApplicationContext annotationConfigApplicationContext = pluginApplicationMap.get(pluginId);
		annotationConfigApplicationContext.stop();
		annotationConfigApplicationContext.close();
		annotationConfigApplicationContext = null;
		pluginApplicationMap.remove(pluginId);
	}

	/**
	 * 根据插件id获取AnnotationConfigApplicationContext
	 * @author perfree
	 * @date 2023-09-27 14:09:02
	 * @param pluginId 插件id
	 * @return org.springframework.context.annotation.AnnotationConfigApplicationContext
	 */
	public static AnnotationConfigApplicationContext getApplicationContext(String pluginId) {
		return pluginApplicationMap.get(pluginId);
	}

	/**
	 * 获取插件内bean
	 * @param pluginId pluginId
	 * @param c c
	 * @return T
	 */
	public static <T> T getPluginBean(String pluginId, Class<T> c) {
		try{
			return pluginApplicationMap.get(pluginId).getBean(c);
		}catch (Exception e) {
			return null;
		}
	}


	public static List<AnnotationConfigApplicationContext> getAllPluginApplicationContext() {
		List<AnnotationConfigApplicationContext> result = new ArrayList<>();
		for (String id : pluginApplicationMap.keySet()) {
			result.add(pluginApplicationMap.get(id));
		}
		return result;
	}

}
