package com.search.docfynd.service;

import co.elastic.clients.elasticsearch.core.search.Hit;
import co.elastic.clients.elasticsearch.ml.Page;
import com.elasticsearch.search.api.model.Result;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.search.docfynd.domain.ESClient;
import org.springframework.stereotype.Service;

import java.awt.print.Pageable;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SearchService {
    private final ESClient esClient;

    public SearchService(ESClient esClient) {
        this.esClient = esClient;
    }

    public List<Result> submitQuery(String query, Integer page) {
        // PaginatedList
        var searchResponse = esClient.search(query);
        List<Hit<ObjectNode>> hits = searchResponse.hits().hits();
        return hits.stream().map(h -> {
            String title = h.source().get("title").asText();
            String content = h.source().get("content").asText();
            String url = h.source().get("url").asText();
            return new Result().abs(treatContent(content)).title(title).url(url);
        }).collect(Collectors.toList());
    }

    private String treatContent(String content) {
        content = content.replaceAll("</?(som|math)\\d*>", "");
        content = content.replaceAll("[^A-Za-z\\s]+", "");
        content = content.replaceAll("\\s+", " ");
        content = content.replaceAll("^\\s+", "");
        return content;
    }
}
