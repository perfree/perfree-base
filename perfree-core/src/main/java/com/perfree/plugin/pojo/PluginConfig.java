package com.perfree.plugin.pojo;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PluginConfig {

    private String id;

    private String name;

    private String mapperLocation;

    private String description;

    private String minimalVersion;

    private String version;

    private String staticLocations;

    private String updateUrl;

    private Boolean isDev;

    private String frontDevAddress;
}
