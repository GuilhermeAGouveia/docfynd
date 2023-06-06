package com.search.docfynd.controller;

import com.elasticsearch.search.api.facade.SearchApi;
import com.elasticsearch.search.api.model.Result;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@RestController
public class SearchController implements SearchApi {

    @Override
    public CompletableFuture<ResponseEntity<List<Result>>> search(String query) {
        var result = new Result().title("Some title").abs("dsjiodjsoi").url("some url");

        return CompletableFuture
                .supplyAsync(() -> ResponseEntity.ok(List.of(result, result)));
    }
}
