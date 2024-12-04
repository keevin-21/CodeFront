package com.java.codeFront.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.java.codeFront.model.News;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Date;

@Service
public class NewsFetcher {

    @Autowired
    private NewsService newsService; // Servicio para guardar noticias

    private final ObjectMapper objectMapper = new ObjectMapper();

    public void fetchAndSaveNews(String url) {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .build();

        try {
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            String jsonResponse = response.body();

            JsonNode articles = objectMapper.readTree(jsonResponse).path("articles");

            for (JsonNode article : articles) {
                News news = new News();
                // Elimina la línea que establece newsID manualmente
                // news.setNewsID(article.path("url").hashCode()); // No lo pongan

                news.setTitle(article.path("title").asText());
                news.setShortDescription(article.path("description").asText());
                news.setDatePublished(new Date());
                news.setAuthor(article.path("author").asText());
                news.setSource(article.path("source").path("name").asText());
                news.setUrl(article.path("url").asText());

                newsService.saveNews(news); // Guardar noticia
            }
        } catch (IOException | InterruptedException e) {
            throw new RuntimeException("Error fetching news", e);
        }
    }
}
