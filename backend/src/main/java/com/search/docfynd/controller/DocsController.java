package com.search.docfynd.controller;

import com.elasticsearch.search.api.facade.DocsApi;
import com.search.docfynd.service.DocsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.concurrent.CompletableFuture;

@RestController
@CrossOrigin
public class DocsController implements DocsApi {
    private final DocsService docsService;

    public DocsController(DocsService docsService) {
        this.docsService = docsService;
    }

    @Override
    public CompletableFuture<ResponseEntity<BigDecimal>> countDocs() {
        return CompletableFuture.supplyAsync(() -> ResponseEntity.ok(new BigDecimal(docsService.countDocs())));
    }
}
