package com.perfree.plugin.pojo;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PluginSpringDoc {

    private String groupName;

    private String pathsToMatch;

    private String packagesToScan;
}
