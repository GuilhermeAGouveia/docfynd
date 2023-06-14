package com.search.docfynd.service;

import com.search.docfynd.domain.ESClient;
import org.springframework.stereotype.Service;

@Service
public class DocsService {
    private final ESClient esClient;

    public DocsService(ESClient esClient) {
        this.esClient = esClient;
    }

    public long countDocs() {
        return esClient.countDocs();
    }
}
