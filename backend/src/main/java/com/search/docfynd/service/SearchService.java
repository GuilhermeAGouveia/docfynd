package com.search.docfynd.service;

import co.elastic.clients.elasticsearch.core.search.Hit;
import com.elasticsearch.search.api.model.Keyword;
import com.elasticsearch.search.api.model.Page;
import com.elasticsearch.search.api.model.Result;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.search.docfynd.domain.ESClient;
import com.search.docfynd.nlu.WatsonNLU;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SearchService {
    private final ESClient esClient;
    private final WatsonNLU watsonNLU;

    public SearchService(ESClient esClient, WatsonNLU watsonNLU) {
        this.esClient = esClient;
        this.watsonNLU = watsonNLU;
    }

    public Page submitQuery(String query, Integer page) {
        // PaginatedList
        var searchResponse = esClient.search(query, page);
        List<Hit<ObjectNode>> hits = searchResponse.hits().hits();
        var results = hits.stream().map(h -> {
            String title = h.source().get("title").asText();
            title = treatContent(title);
            String content = h.source().get("content").asText();
            content = treatContent(content);
            String url = h.source().get("url").asText();
            String highlight = h.highlight().get("content").get(0);
            highlight = treatHightlight(highlight);
            List<Keyword> keywords = watsonNLU.extractConcepts(content);
            return new Result().abs(content).title(title).url(url).keywords(keywords).highlightAbs(highlight);
        }).toList();

        return new Page().data(results).total((int) searchResponse.hits().total().value()).took((int) searchResponse.took());
    }

    private String treatContent(String content) {
        content = content.replaceAll("</?(som|math)\\d*>", "");
        content = content.replaceAll("[^A-Za-z\\s]+", "");
        content = content.replaceAll("\\s+", " ");
        content = content.replaceAll("^\\s+", "");
        return content;
    }
    private String treatHightlight(String content) {
        content = content.replaceAll("</?(som|math)\\d*>", "");
        //content = content.replaceAll("[^A-Za-z\\s]+", "");
        content = content.replaceAll("\\s+", " ");
        content = content.replaceAll("^\\s+", "");
        return content;
    }

}
