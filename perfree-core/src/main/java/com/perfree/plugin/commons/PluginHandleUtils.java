package com.perfree.plugin.commons;

import com.perfree.commons.constant.SystemConstants;
import com.perfree.commons.utils.SqlExecUtils;
import com.perfree.plugin.pojo.PluginBaseConfig;
import org.dromara.hutool.core.compress.ZipUtil;
import org.dromara.hutool.core.data.id.IdUtil;
import org.dromara.hutool.core.io.file.FileReader;
import org.dromara.hutool.core.io.file.FileUtil;
import org.dromara.hutool.core.text.StrUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yaml.snakeyaml.Yaml;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;
import java.util.jar.JarEntry;
import java.util.jar.JarFile;
import java.util.regex.Pattern;

public class PluginHandleUtils {
    private static final Logger LOGGER = LoggerFactory.getLogger(PluginHandleUtils.class);

    public static final String CODE_DIR = "code";

    public static final String LIB_DIR = "lib";

    public static final String PLUGIN_CONFIG_NAME = "plugin.yaml";

    public static final String TARGET_CLASS_DIR = "classes";

    public static final String PLUGIN_UI_DIR = "ui";

    public static final String SQL_DIR = "sql";

    /**
     * 获取插件配置信息
     *
     * @param pluginFile pluginFile
     * @return PluginBaseConfig
     */
    public static PluginBaseConfig getPluginConfig(File pluginFile) {
        File file = new File(pluginFile.getAbsolutePath() + File.separator + PLUGIN_CONFIG_NAME);
        if (!file.exists()) {
            LOGGER.error("plugin.yaml not found");
            return null;
        }
        PluginBaseConfig pluginBaseConfig = null;
        try (InputStream input = new FileInputStream(file.getAbsoluteFile())) {
            Yaml yaml = new Yaml();
            pluginBaseConfig = yaml.loadAs(input, PluginBaseConfig.class);
        } catch (Exception e) {
            LOGGER.error("plugin.yaml parse error", e);
        }
        return pluginBaseConfig;
    }

    /**
     * 根据插件id获取已经安装的插件的配置
     */
    public static PluginBaseConfig getInstalledPluginConfig(String pluginId) {
        File file = new File(SystemConstants.PLUGINS_DIR + File.separator + pluginId);
        if (file.exists()) {
            return getPluginConfig(file);
        }
        return null;
    }

    /**
     * 将临时插件文件拷贝至指定目录
     */
    public static File devCopyPluginToPluginDir(String devPluginDir, String pluginBaseDir) {
        File codeDirFile = new File(devPluginDir + File.separator + TARGET_CLASS_DIR);
        PluginBaseConfig pluginConfig = getPluginConfig(codeDirFile);
        if (null == pluginConfig) {
            LOGGER.error("plugin.yaml parse fail");
            return null;
        }

        File pluginDir = new File(pluginBaseDir + File.separator + pluginConfig.getPlugin().getId());

        if (pluginDir.exists()) {
            FileUtil.clean(pluginDir.getAbsoluteFile());
        }

        File[] codeFiles = codeDirFile.listFiles();
        if (null == codeFiles) {
            return null;
        }


        File codeDestDirFile = new File(pluginDir.getAbsolutePath() + File.separator + PluginHandleUtils.CODE_DIR);
        if (!codeDestDirFile.exists()) {
            FileUtil.mkdir(codeDestDirFile);
        }
        for (File pluginSource : codeFiles) {
            switch (pluginSource.getName()) {
                case PLUGIN_CONFIG_NAME, PLUGIN_UI_DIR, SQL_DIR ->
                        FileUtil.copy(pluginSource, pluginDir.getAbsoluteFile(), true);
                default -> FileUtil.copy(pluginSource, codeDestDirFile, true);
            }
        }

        // 拷贝依赖文件
        File libDirFile = new File(devPluginDir + File.separator + PluginHandleUtils.LIB_DIR);
        File[] libFiles = libDirFile.listFiles();
        if (null == libFiles) {
            return pluginDir;
        }
        File libeDestDirFile = new File(pluginDir.getAbsolutePath() + File.separator + PluginHandleUtils.LIB_DIR);
        if (!libeDestDirFile.exists()) {
            FileUtil.mkdir(libeDestDirFile);
        }
        for (File pluginSource : libFiles) {
            FileUtil.copy(pluginSource, libeDestDirFile, true);
        }
        return pluginDir;
    }

    /**
     * 解压jar格式的插件
     */
    public static void extractJarPlugin(File srcJarFile, File destFile) throws Exception {
        if (!destFile.exists()) {
            FileUtil.mkdir(destFile);
        }
        Enumeration<JarEntry> jarEntries;
        try (JarFile jarFile = new JarFile(srcJarFile)) {
            jarEntries = jarFile.entries();
            while (jarEntries.hasMoreElements()) {
                JarEntry entry = jarEntries.nextElement();
                if (entry.getName().endsWith("/")) {
                    File dirFile = new File(destFile + File.separator + entry.getName());
                    FileUtil.mkdir(dirFile);
                } else {
                    File file = new File(destFile + File.separator + entry.getName());
                    InputStream inputStream = jarFile.getInputStream(entry);
                    OutputStream outputStream = new FileOutputStream(file);
                    byte[] buffer = new byte[1024];
                    int bytesRead;
                    while ((bytesRead = inputStream.read(buffer)) != -1) {
                        outputStream.write(buffer, 0, bytesRead);
                    }
                    inputStream.close();
                    outputStream.flush();
                    outputStream.close();
                }
            }
        }
    }


    /**
     * 解压压缩包形式的插件
     *
     * @param pluginFile pluginFile
     * @return File
     */
    public static File extractZipPlugin(File pluginFile) throws Exception {
        File unzip = ZipUtil.unzip(pluginFile,
                new File(SystemConstants.UPLOAD_TEMP_PATH + SystemConstants.FILE_SEPARATOR + IdUtil.fastSimpleUUID()).getAbsoluteFile());
        File codeFile = new File(unzip.getAbsolutePath() + SystemConstants.FILE_SEPARATOR + CODE_DIR);
        if (codeFile.exists() && null != codeFile.listFiles()) {
            File[] files = codeFile.listFiles();
            if (null == files) {
                return unzip;
            }
            for (File file : files) {
                if (file.getName().endsWith(".jar")) {
                    extractJarPlugin(file, codeFile);
                    FileUtil.del(file);
                }

            }
        }
        return unzip;
    }


    /**
     * 获取插件中所有的class集合
     *
     * @param pluginDir   插件目录
     * @param classLoader 插件classLoader
     * @return java.util.List<java.lang.Class < ?>>
     * @author perfree
     * @date 2023-09-27 16:09:53
     */
    public static List<Class<?>> getClassList(File pluginDir, ClassLoader classLoader) {
        List<Class<?>> classList = new ArrayList<>();
        if (!pluginDir.exists()) {
            return classList;
        }
        File codeDir = new File(pluginDir.getAbsolutePath() + File.separator + CODE_DIR);
        List<File> files = FileUtil.loopFiles(codeDir);
        for (File file : files) {
            if (file.getName().endsWith(".class")) {
                String entryName = file.getAbsolutePath().replace(codeDir.getAbsolutePath(), "").replaceAll("[\\\\/]", ".");
                if (entryName.startsWith(".")) {
                    entryName = entryName.replaceFirst(".", "");
                }
                String className = entryName.substring(0, entryName.length() - 6);
                Class<?> aClass;
                try {
                    aClass = classLoader.loadClass(className);
                } catch (ClassNotFoundException e) {
                    throw new RuntimeException(e);
                }
                classList.add(aClass);
            }
        }
        return classList;
    }

    /**
     * 获取插件中所有的mapperXml
     *
     * @param pluginDir        pluginDir
     * @param pluginBaseConfig pluginBaseConfig
     * @return List<File>
     */
    public static List<File> getMapperXml(File pluginDir, PluginBaseConfig pluginBaseConfig) {
        String xmlLocationPattern = pluginBaseConfig.getPlugin().getMapperLocation()
                .replaceAll("\\*\\*", "<>")
                .replaceAll("\\*", "<>")
                .replaceAll("\\.", "\\.")
                .replaceAll("<>", ".*");

        File codeDir = new File(pluginDir.getAbsolutePath() + File.separator + CODE_DIR);
        List<File> files = FileUtil.loopFiles(codeDir);
        List<File> result = new ArrayList<>();
        for (File file : files) {
            String realPath = file.getAbsolutePath().replace(codeDir.getAbsolutePath() + File.separator, "").replaceAll("\\\\", "/");
            if (Pattern.matches(xmlLocationPattern, realPath) && file.getName().endsWith(".xml")) {
                result.add(file);
            }
        }
        return result;
    }

    /**
     * 获取插件中所有的mapperXml路径
     *
     * @param pluginDir        pluginDir
     * @param pluginBaseConfig pluginBaseConfig
     * @return List<String>
     */
    public static List<String> getMapperXmlPath(File pluginDir, PluginBaseConfig pluginBaseConfig) {
        String xmlLocationPattern = pluginBaseConfig.getPlugin().getMapperLocation()
                .replaceAll("\\*\\*", "<>")
                .replaceAll("\\*", "<>")
                .replaceAll("\\.", "\\.")
                .replaceAll("<>", ".*");
        File codeDir = new File(pluginDir.getAbsolutePath() + File.separator + CODE_DIR);
        List<File> files = FileUtil.loopFiles(codeDir);
        List<String> result = new ArrayList<>();
        for (File file : files) {
            String realPath = file.getAbsolutePath().replace(codeDir.getAbsolutePath() + File.separator, "").replaceAll("\\\\", "/");
            if (Pattern.matches(xmlLocationPattern, realPath) && file.getName().endsWith(".xml")) {
                result.add(file.getAbsolutePath());
            }
        }
        return result;
    }

    public static File copyPluginTempToPlugin(File pluginTempDir, PluginBaseConfig pluginConfig) {
        File pluginDir = new File(SystemConstants.PLUGINS_DIR + File.separator + pluginConfig.getPlugin().getId());
        if (!pluginDir.exists()) {
            FileUtil.mkdir(pluginDir);
        }
        File[] files = pluginTempDir.listFiles();
        if (null == files) {
            return null;
        }
        for (File file : files) {
            FileUtil.copy(file, pluginDir, true);
        }
        return pluginDir;
    }

    public static long versionToLong(String versionStr) {
        return Long.parseLong(versionStr.replaceAll("\r\n", "").replaceAll("--", "")
                .replaceAll("\\.", "").replace("v", ""));
    }

    public static PluginBaseConfig getDevPluginConfig(String pluginPath) {
        File classes = new File(pluginPath + "/classes");
        if (!classes.exists()) {
            LOGGER.error("{} not found", pluginPath);
            return null;
        }
        return PluginHandleUtils.getPluginConfig(classes);
    }

    /**
     * 执行插件安装sql脚本
     *
     * @param pluginDir pluginDir
     */
    public static void execPluginInstallSql(File pluginDir) throws SQLException {
        if (null == pluginDir || !pluginDir.exists()) {
            return;
        }
        File sqlDirFile = new File(pluginDir.getAbsolutePath() + File.separator + SQL_DIR);
        if (!sqlDirFile.exists()) {
            return;
        }
        File[] files = sqlDirFile.listFiles();
        if (null == files) {
            return;
        }
        for (File file : files) {
            if (file.getName().endsWith(".sql") && file.getName().startsWith("install")) {
                FileReader fileReader = new FileReader(file.getAbsoluteFile(), StandardCharsets.UTF_8);
                String sqlStr = fileReader.readString();
                SqlExecUtils.execSql(sqlStr);
                LOGGER.info("执行插件安装sql: {}", sqlStr);
            }
        }
    }

    /**
     * 执行更新sql
     *
     * @param pluginDir  pluginDir
     * @param oldVersion oldVersion
     * @param newVersion newVersion
     */
    public static void execPluginUpdateSql(File pluginDir, String oldVersion, String newVersion) throws SQLException {
        if (null == pluginDir || !pluginDir.exists()) {
            return;
        }
        File sqlDir = new File(pluginDir.getAbsolutePath() + File.separator + SQL_DIR);
        if (!sqlDir.exists()) {
            return;
        }

        // 获取要执行的更新sql文件
        List<File> updateSqlFiles = FileUtil.loopFiles(sqlDir)
                .stream()
                .filter(file -> file.isFile() && StrUtil.startWith(file.getName(), "update-") && file.getName().endsWith(".sql")
                        && isWithinVersionRange(file, oldVersion, newVersion))
                .toList();
        for (File updateSqlFile : updateSqlFiles) {
            FileReader fileReader = new FileReader(updateSqlFile, StandardCharsets.UTF_8);
            String sqlStr = fileReader.readString();
            SqlExecUtils.execSql(sqlStr);
            LOGGER.info("执行插件更新sql: {}", sqlStr);
        }
    }

    /**
     * 判断更新文件是否在版本范围内
     *
     * @param file       file
     * @param oldVersion oldVersion
     * @param newVersion newVersion
     * @return boolean
     */
    private static boolean isWithinVersionRange(File file, String oldVersion, String newVersion) {
        String fileName = file.getName();
        String versionStr = fileName.substring("update-".length(), fileName.length() - ".sql".length());
        long currFileVersionNum = PluginHandleUtils.versionToLong(versionStr);
        long oldVersionNum = PluginHandleUtils.versionToLong(oldVersion);
        long newVersionNum = PluginHandleUtils.versionToLong(newVersion);
        return currFileVersionNum > oldVersionNum && currFileVersionNum <= newVersionNum;
    }

    /**
     * 执行卸载插件sql
     *
     * @param pluginDir pluginDirFile
     */
    public static void execPluginUnInstallSql(File pluginDir) throws SQLException {
        if (null == pluginDir || !pluginDir.exists()) {
            return;
        }
        File installSqlFile = new File(pluginDir.getAbsolutePath() + File.separator + SQL_DIR + File.separator + "uninstall.sql");
        if (installSqlFile.exists()) {
            FileReader fileReader = new FileReader(installSqlFile, StandardCharsets.UTF_8);
            String sqlStr = fileReader.readString();
            SqlExecUtils.execSql(sqlStr);
            LOGGER.info("执行插件卸载sql: {}", sqlStr);
        }
    }
}
