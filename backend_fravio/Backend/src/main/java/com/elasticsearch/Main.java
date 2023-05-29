package com.elasticsearch;

import co.elastic.clients.elasticsearch.core.search.Hit;
import com.elasticsearch.client.ESClient;
import com.fasterxml.jackson.databind.node.ObjectNode;

import java.io.IOException;
import java.util.List;

// Press Shift twice to open the Search Everywhere dialog and type `show whitespaces`,
// then press Enter. You can now see whitespace characters in your code.
public class Main {
    public static void main(String[] args) {
        ESClient esClient = new ESClient("match test");
        try {
            var searchResponse = esClient.search();
            List<Hit<ObjectNode>> hits = searchResponse.hits().hits();

            hits.forEach(h -> {
                String title = h.source().get("title").asText();
                String content = h.source().get("content").asText();
                printResult(title, content);
            });

        } catch (IOException e) {
            System.out.println("Erro durante a conexão do cliente");
        }


    }

    private static void printResult(String title, String content) {
        System.out.println(title);
        System.out.println("---------");

        content = content.replaceAll("</?(som|math)\\d*>", "");
        content = content.replaceAll("[^A-Za-z\\s]+", "");
        content = content.replaceAll("\\s+", " ");
        content = content.replaceAll("^\\s+", "");

        System.out.println(content);
        System.out.println("===================");
    }
}