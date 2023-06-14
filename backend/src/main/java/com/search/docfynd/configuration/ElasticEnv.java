package com.search.docfynd.configuration;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;


@Configuration
@ConfigurationProperties(prefix = "elastic")
@Setter
@Getter
public class ElasticEnv {
    private String host;
    private String username;
    private String password;

}
