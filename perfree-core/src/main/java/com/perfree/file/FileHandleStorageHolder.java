package com.perfree.file;

import com.perfree.file.handle.BaseFileHandle;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class FileHandleStorageHolder {

    private final static Map<Integer, BaseFileHandle> fileHandleMap = new ConcurrentHashMap<>();

    public static void putFileHandleStorage(Integer storage, BaseFileHandle baseFileHandle) {
        fileHandleMap.put(storage, baseFileHandle);
    }

    public static void removeFileHandleStorage(Integer storage) {
        fileHandleMap.remove(storage);
    }

    public static BaseFileHandle getFileHandleStorage(Integer storage) {
        return fileHandleMap.get(storage);
    }


    public static List<BaseFileHandle> getAllFileHandleStorage() {
        List<BaseFileHandle> result = new ArrayList<>();
        for (Integer id : fileHandleMap.keySet()) {
            result.add(fileHandleMap.get(id));
        }
        return result;
    }
}
