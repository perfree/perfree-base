package com.perfree.plugin.core;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.io.IoUtil;
import com.perfree.commons.constant.SystemConstants;
import com.perfree.plugin.commons.PluginHandleUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.net.URLClassLoader;

public class PluginClassLoader extends URLClassLoader {

    private static final Logger LOGGER = LoggerFactory.getLogger(PluginClassLoader.class);

    private static final String JAVA_PACKAGE_PREFIX = "java.";
    private final ClassLoader parentClassLoader;

    private final ClassLoader systemClassLoader;

    private final String pluginId;



  /*  public PluginClassLoader() {
        super(new URL[0]);
    }*/

    public PluginClassLoader(String pluginId, ClassLoader parent, ClassLoader system) {
        super(new URL[0], parent);
        this.pluginId = pluginId;
        parentClassLoader = parent;
        systemClassLoader = system;
    }

    @Override
    public void close() throws IOException {
        try {
            super.close();
        } catch (IOException e) {
            LOGGER.error("Error closing class loader", e);
            throw e;
        }
    }

    public void addURL(URL url) {
        super.addURL(url);
    }

    public void addFile(File file) {
        try {
            File codeFile = new File(file.getAbsolutePath() + File.separator + PluginHandleUtils.CODE_DIR);
            addURL(codeFile.getCanonicalFile().toURI().toURL());
            File libFile = new File(file.getAbsolutePath() + File.separator + PluginHandleUtils.LIB_DIR);
            if (libFile.exists() && libFile.listFiles() != null) {
                File[] files = libFile.listFiles();
                if (null == files || files.length == 0) {
                    return;
                }
                for (File jarFile : files) {
                    addURL(jarFile.toURI().toURL());
                }
            }
        } catch (IOException e) {
            LOGGER.error("PluginClassLoader addFile error", e);
            throw new RuntimeException(e);
        }
    }



    @Override
    public Class<?> loadClass(String className) throws ClassNotFoundException {
        synchronized (getClassLoadingLock(className)) {
            return findClass(className);
        }
    }

    @Override
    protected Class<?> findClass(String className) throws ClassNotFoundException {
        Class<?> loadedClass = findClassFromParent(className);
        if (loadedClass != null) {
            return loadedClass;
        }
        loadedClass = findLoadedClass(className);
        if (loadedClass != null) {
            return loadedClass;
        }
        loadedClass = findClassFromLocal(className);
        if (loadedClass != null) {
            return loadedClass;
        }

        loadedClass = systemClassLoader.loadClass(className);
        if (loadedClass != null) {
            return loadedClass;
        }
        throw new ClassNotFoundException("ClassLoader[" + pluginId  +"]:" + className);
    }

    protected Class<?> findClassFromParent(String className) throws ClassNotFoundException{
        try {
            if(parentClassLoader != null){
                return parentClassLoader.loadClass(className);
            }
            return null;
        } catch (Exception e){
            return null;
        }
    }

    protected Class<?> findClassFromLocal(String className) {
        Class<?> aClass = null;
        String formatClassName = formatClassName(className);
        File file = new File(SystemConstants.PLUGINS_DIR + File.separator + this.pluginId +
                File.separator + PluginHandleUtils.CODE_DIR + File.separator + formatClassName);
        if (file.exists()) {
            BufferedInputStream inputStream = FileUtil.getInputStream(file.getAbsoluteFile());
            byte[] bytes = IoUtil.readBytes(inputStream);
            aClass = super.defineClass(className, bytes, 0, bytes.length );
        }
        return aClass;
    }

    private String formatClassName(String className) {
        className = className.replace( '/', '~' );
        className = className.replace( '.', '/' ) + ".class";
        className = className.replace( '~', '/' );
        return className;
    }

}
