package com.java.codeFront.controller;

import com.java.codeFront.service.NewsFetcher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class NewsController {

    @Autowired
    private NewsFetcher fetcherAPI;

    @Value("${newsapi.key}")
    private String apiKey;

    private final String COMMON_URL = "https://newsapi.org/v2/everything";

    // Endpoint REST para buscar noticias
    @GetMapping("/news")
    public String getNewsFromSearching(@RequestParam String query) {
        String url = COMMON_URL + "?q=" + query.replace(" ", "+") + "&apiKey=" + apiKey;
        return fetcherAPI.getData(url);
    }

    // Método reutilizable para obtener noticias (consola o API)
    public String getNewsFromConsole(String query) {
        String url = COMMON_URL + query.replace(" ", "+") + "&apiKey=" + apiKey;
        return fetcherAPI.getData(url);
    }
}
