package com.perfree.file.handle.s3;


import lombok.Data;

@Data
public class FileS3Config {

    private String endpoint;
    private String bucket;
    private String accessKey;
    private String accessSecret;
    private String domain;
    private String uploadDir;
}
