package com.java.codeFront.controller;

import com.java.codeFront.model.News;
import com.java.codeFront.service.NewsFetcher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/news")
public class NewsController {

    @Autowired
    private NewsFetcher newsFetcher;

    @Value("${newsapi.key}")
    private String apiKey;

    private static final String COMMON_URL = "https://newsapi.org/v2/everything";

    // Endpoint para obtener noticias de tecnología al inicio
// Endpoint para obtener noticias basado en un término de búsqueda
    @GetMapping("/home")
    public CompletableFuture<ResponseEntity<List<News>>> getNews(@RequestParam(required = false) String searchQuery) {
        String query = (searchQuery != null && !searchQuery.isEmpty()) ? searchQuery : "technology";
        String url = COMMON_URL + "?q=" + query.replace(" ", "+") + "&language=en&sortBy=relevancy&apiKey=" + apiKey;

        return newsFetcher.fetchAndSaveNewsAsync(url)
                .thenApply(newsList -> ResponseEntity.ok().body(newsList))
                .exceptionally(e -> ResponseEntity.status(500).build());
    }

    @GetMapping("/process")
    public ResponseEntity<String> processNews(@RequestParam(required = false) String searchQuery) {
        String query = (searchQuery != null && !searchQuery.isEmpty()) ? searchQuery : "technology";
        String url = COMMON_URL + "?q=" + query.replace(" ", "+") + "&language=en&sortBy=relevancy&apiKey=" + apiKey;

        try {
            List<News> newsList = newsFetcher.fetchAndSaveNews(url);
            return ResponseEntity.ok("Noticias procesadas exitosamente para el término: " + query);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al procesar noticias: " + e.getMessage());
        }
    }

}
