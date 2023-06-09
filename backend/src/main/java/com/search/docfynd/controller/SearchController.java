package com.search.docfynd.controller;

import com.elasticsearch.search.api.facade.SearchApi;
import com.elasticsearch.search.api.model.Filter;
import com.elasticsearch.search.api.model.Page;
import com.elasticsearch.search.api.model.Result;
import com.search.docfynd.service.SearchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.NativeWebRequest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;

@RestController
@CrossOrigin
public class SearchController implements SearchApi {

    private final SearchService searchService;

    public SearchController(SearchService searchService) {
        this.searchService = searchService;

    }

    @Override
    public CompletableFuture<ResponseEntity<Page>> searchWithFilter(Filter filter, String query, Integer page, Integer limit) {
        var result = searchService.submitQuery(query, page, Optional.of(filter));

        return CompletableFuture
                .supplyAsync(() -> ResponseEntity.ok(result));
    }

    @Override
    public CompletableFuture<ResponseEntity<Page>> search(String query, Integer page, Integer limit) {
        var result = searchService.submitQuery(query, page, Optional.empty());

        return CompletableFuture
                .supplyAsync(() -> ResponseEntity.ok(result));
    }
}
