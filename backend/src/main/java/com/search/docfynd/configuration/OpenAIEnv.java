package com.search.docfynd.configuration;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "openai")
@Setter
@Getter
public class OpenAIEnv {
    private String apiKey;
    private String serviceUrl;
}
