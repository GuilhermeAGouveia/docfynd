package com.search.docfynd.domain;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch._types.query_dsl.BoolQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.MatchPhraseQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.MatchQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import co.elastic.clients.elasticsearch.core.search.Highlight;
import co.elastic.clients.elasticsearch.core.search.HighlightField;
import co.elastic.clients.json.jackson.JacksonJsonpMapper;
import co.elastic.clients.transport.ElasticsearchTransport;
import co.elastic.clients.transport.rest_client.RestClientTransport;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.search.docfynd.configuration.ElasticEnv;
import nl.altindag.ssl.SSLFactory;
import org.apache.http.HttpHost;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.impl.nio.client.HttpAsyncClientBuilder;
import org.elasticsearch.client.RestClient;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Component
public class ESClient {
    private ElasticsearchClient elasticsearchClient;

    private final ElasticEnv elasticEnv;

    public ESClient(ElasticEnv elasticEnv) {
        this.elasticEnv = elasticEnv;
        createConnection();
    }

    public static Optional<Map<String, List<String>>> splitOptionalAndObrigatory(String input) {
        Map terms = new HashMap<String, List<String>>();
        Pattern pattern = Pattern.compile("\"(.*?)\"");
        Matcher matcher = pattern.matcher(input);

        List extractedObrigatoryTerms = new ArrayList<String>();
        while (matcher.find()) {
            extractedObrigatoryTerms.add(matcher.group().replace("\"", ""));
        }

        if (extractedObrigatoryTerms.size() == 0) {
            return Optional.empty();
        }

        terms.put("obrigatory", extractedObrigatoryTerms);


        List words = Arrays.stream(input.split("\"(.*?)\"")).filter(s -> s != "").collect(Collectors.toList());


        terms.put("optional", words);

        return Optional.of(terms);
    }

    private void createConnection() {

        CredentialsProvider credentialsProvider = new BasicCredentialsProvider();
        credentialsProvider.setCredentials(AuthScope.ANY, new UsernamePasswordCredentials(elasticEnv.getUsername(), elasticEnv.getPassword()));

        SSLFactory sslFactory = SSLFactory.builder().withUnsafeTrustMaterial().withUnsafeHostnameVerifier().build();


        RestClient restClient = RestClient.builder(new HttpHost(elasticEnv.getHost(), 443, "https")).setHttpClientConfigCallback((HttpAsyncClientBuilder httpClientBuilder) -> httpClientBuilder.setDefaultCredentialsProvider(credentialsProvider).setSSLContext(sslFactory.getSslContext()).setSSLHostnameVerifier(sslFactory.getHostnameVerifier())).build();

        ElasticsearchTransport transport = new RestClientTransport(restClient, new JacksonJsonpMapper());

        elasticsearchClient = new ElasticsearchClient(transport);
    }

    private Query buildWithoutObrigatoryTermsQuery(String query) {
        Query mathQuery = MatchQuery.of(q -> q.field("content").query(query))._toQuery();
        Query mathPhraseContent = MatchPhraseQuery.of(q -> q.field("content").query(query).boost(5.1f))._toQuery();
        Query mathPhraseTitle = MatchPhraseQuery.of(q -> q.field("title").query(query).boost(10f))._toQuery();
        Query boolQuery = BoolQuery.of(b -> b.must(List.of(mathQuery)).should(List.of(mathPhraseContent, mathPhraseTitle)))._toQuery();

        return boolQuery;
    }

    private Query buildWithObrigatoryTermsQuery(Map<String, List<String>> obrigatoryAndOptionalTerms) {
        List<Query> obrigatoryTermsMathQueries = obrigatoryAndOptionalTerms.get("obrigatory").stream().map(term -> MatchPhraseQuery.of(q -> q.field("content").query(term))._toQuery()).collect(Collectors.toList());
        String optionalTerms = obrigatoryAndOptionalTerms.get("optional").stream().collect(Collectors.joining(" "));
        Query optionalTermsMathQuery = MatchQuery.of(q -> q.field("content").query(optionalTerms))._toQuery();
        // Por default a query realizará um AND entre todos os termos obrigatórios e um OR entre os termos opcionais, é importante ressaltar que mesmo que nenhum dos termos opcionais seja encontrado, a query retornará resultados
        Query boolQuery = BoolQuery.of(b -> b.must(obrigatoryTermsMathQueries).should(optionalTermsMathQuery))._toQuery();
        return boolQuery;
    }

    public SearchResponse search(String query) {

        var splitedOrigatoryAndOptionalTerms = splitOptionalAndObrigatory(query);

        try {
            Query boolQuery;
            boolQuery = splitedOrigatoryAndOptionalTerms.isEmpty() ? buildWithoutObrigatoryTermsQuery(query) : buildWithObrigatoryTermsQuery(splitedOrigatoryAndOptionalTerms.get());
            SearchResponse<ObjectNode> response;

            HighlightField highlightField = HighlightField.of(h -> h.highlightQuery(boolQuery));
            Highlight highlight = Highlight.of(h -> h.fields("content", highlightField).numberOfFragments(0).preTags("<strong>").postTags("</strong>"));

            response = elasticsearchClient.search(s -> s.index("wikipedia").from(0).size(10).query(boolQuery).highlight(highlight), ObjectNode.class);
            return response;
        } catch (IOException e) {
            System.out.println(e.getStackTrace());
            return null;
        }
    }

    public long countDocs() {
        try {
            var countDocs = elasticsearchClient.count(c -> c.index("wikipedia"));
            return countDocs.count();
        } catch (IOException e) {
            System.out.println(e.getStackTrace());
            return 0;
        }
    }
}
