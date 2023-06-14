package com.search.docfynd.controller;

import com.elasticsearch.search.api.facade.SearchApi;
import com.elasticsearch.search.api.model.Result;
import com.search.docfynd.service.SearchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.NativeWebRequest;

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
    public CompletableFuture<ResponseEntity<List<Result>>> search(String query, Integer page, Integer limit) {
        var result = searchService.submitQuery(query, page);

        return CompletableFuture
                .supplyAsync(() -> ResponseEntity.ok(result));
    }
}
