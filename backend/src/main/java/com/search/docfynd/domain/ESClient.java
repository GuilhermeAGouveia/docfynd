package com.search.docfynd.domain;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch._types.query_dsl.MatchQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import co.elastic.clients.json.jackson.JacksonJsonpMapper;
import co.elastic.clients.transport.ElasticsearchTransport;
import co.elastic.clients.transport.rest_client.RestClientTransport;
import com.fasterxml.jackson.databind.node.ObjectNode;
import nl.altindag.ssl.SSLFactory;
import org.apache.http.HttpHost;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.impl.nio.client.HttpAsyncClientBuilder;
import org.elasticsearch.client.RestClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class ESClient {
    private ElasticsearchClient elasticsearchClient;

    @Value("${elastic.password}")
    private String elasticPassword;

    public ESClient() {
        createConnection();
    }

    private void createConnection() {
        String USER = "elastic";
        String PWD = "PGzvl6tSI180uxQLHSk3KXrC";

        CredentialsProvider credentialsProvider = new BasicCredentialsProvider();
        credentialsProvider.setCredentials(AuthScope.ANY, new UsernamePasswordCredentials(USER, PWD));

        SSLFactory sslFactory = SSLFactory.builder().withUnsafeTrustMaterial().withUnsafeHostnameVerifier().build();


        RestClient restClient = RestClient.builder(new HttpHost("docfynd.es.us-central1.gcp.cloud.es.io", 443, "https"))
                .setHttpClientConfigCallback(
                        (HttpAsyncClientBuilder httpClientBuilder) ->
                                httpClientBuilder.setDefaultCredentialsProvider(credentialsProvider)
                                        .setSSLContext(sslFactory.getSslContext())
                                        .setSSLHostnameVerifier(sslFactory.getHostnameVerifier())
                )
                .build();

        ElasticsearchTransport transport = new RestClientTransport(
                restClient,
                new JacksonJsonpMapper()
        );

        elasticsearchClient = new ElasticsearchClient(transport);
    }

    public SearchResponse search(String query) {
        try {
            Query mathQuery = MatchQuery.of(
                    q -> q.field("content").query(query))._toQuery();

            SearchResponse<ObjectNode> response;
            response = elasticsearchClient.search(s -> s.index("wikipedia").from(0).size(10).query(mathQuery), ObjectNode.class);
            return response;
        } catch (IOException e) {

        }

        return null;
    }
}
