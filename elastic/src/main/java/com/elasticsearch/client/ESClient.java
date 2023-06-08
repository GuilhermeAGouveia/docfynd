package com.elasticsearch.client;

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

import java.io.IOException;

public class
ESClient {
    private ElasticsearchClient elasticsearchClient;

    private final String query;

    public ESClient(String query) {
        this.query = query;
        createConnection();
    }

    private void createConnection() {
        String USER = "elastic";
        String PWD = "changeme";

        CredentialsProvider credentialsProvider = new BasicCredentialsProvider();
        credentialsProvider.setCredentials(AuthScope.ANY, new UsernamePasswordCredentials(USER, PWD));

        SSLFactory sslFactory = SSLFactory.builder().withUnsafeTrustMaterial().withUnsafeHostnameVerifier().build();


        RestClient restClient = RestClient.builder(new HttpHost("localhost", 9200, "https"))
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

    public SearchResponse search() throws IOException {
        Query mathQuery = MatchQuery.of(
                q -> q.field("content").query(query))._toQuery();

        SearchResponse<ObjectNode> response;
        response = elasticsearchClient.search(s -> s.index("wikipedia").from(0).size(10).query(mathQuery), ObjectNode.class);
        return response;
    }

}
