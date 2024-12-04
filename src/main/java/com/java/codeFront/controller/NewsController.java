package com.java.codeFront.controller;

import com.java.codeFront.service.NewsFetcher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/news")
public class NewsController {

    @Autowired
    private NewsFetcher newsFetcher;

    @Value("${newsapi.key}")
    private String apiKey;

    private final String COMMON_URL = "https://newsapi.org/v2/everything";

    // Endpoint para obtener y guardar noticias basado en un término de búsqueda
    @PostMapping("/save")
    public String fetchAndSaveNews(@RequestParam String searchQuery) {
        String url = COMMON_URL + "?q=" + searchQuery.replace(" ", "+") + "&apiKey=" + apiKey;
        try {
            newsFetcher.fetchAndSaveNews(url);
            return "Noticias obtenidas y guardadas para el término: " + searchQuery;
        } catch (Exception e) {
            return "Error al guardar noticias: " + e.getMessage();
        }
    }
    public String searchNewsFromConsole(@RequestParam String searchQuery) {
        String url = COMMON_URL + "?q=" + searchQuery.replace(" ", "+") + "&apiKey=" + apiKey;
        try {
            // Método para obtener y guardar las noticias
            newsFetcher.fetchAndSaveNews(url);
            return "Noticias obtenidas para: " + searchQuery;
        } catch (Exception e) {
            return "Error al obtener noticias: " + e.getMessage();
        }
    }
}