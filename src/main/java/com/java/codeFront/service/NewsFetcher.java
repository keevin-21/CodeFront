package com.java.codeFront.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.java.codeFront.model.News;
import com.java.codeFront.repository.NewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Service
public class NewsFetcher {
    @Autowired
    // private NewsService newsService; // Servicio para guardar noticias
    private NewsRepository newsRepository;
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final ExecutorService executorService = Executors.newCachedThreadPool();

    public CompletableFuture<List<News>> fetchAndSaveNewsAsync(String url) {
        return CompletableFuture.supplyAsync(() -> fetchAndSaveNews(url), executorService);
    }

    public List<News> fetchAndSaveNews(String url) {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .build();
        try {
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            String jsonResponse = response.body();

            JsonNode articles = objectMapper.readTree(jsonResponse).path("articles");
            List<News> newsList = new ArrayList<>();

            for (JsonNode article : articles) {
                String title = article.path("title").asText();
                String description = article.path("description").asText();
                String content = article.path("content").asText();
                String author = article.path("author").asText();

                if ("[Removed]".equalsIgnoreCase(title) || "[Removed]".equalsIgnoreCase(description)
                        || "[Removed]".equalsIgnoreCase(content) || "[Removed]".equalsIgnoreCase(author)) {
                    continue;
                }

                News news = new News();
                news.setTitle(article.path("title").asText());
                news.setShortDescription(article.path("description").asText());
                news.setDatePublished(new Date());
                news.setAuthor(article.path("author").asText());
                news.setSource(article.path("source").path("name").asText());
                news.setUrl(article.path("url").asText());
                news.setUrlToImage(article.path("urlToImage").asText());
                news.setContent(article.path("content").asText());
                newsList.add(news);
            }
            return newsList;
        } catch (IOException | InterruptedException e) {
            throw new RuntimeException("Error al obtener noticias: " + e.getMessage());
        }
    }
}