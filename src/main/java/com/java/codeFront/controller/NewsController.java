package com.java.codeFront.controller;

import com.java.codeFront.service.NewsFetcher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class NewsController {

    @Autowired
    private NewsFetcher newsFetcher;

    // Método para obtener noticias basado en un término de búsqueda
    public String getNewsFromConsole(String searchQuery) {
        String apiKey = "d2b9b326b1a14b9b86c3fec798bcf106";
        String url = "https://newsapi.org/v2/everything?q=" + searchQuery + "&apiKey=" + apiKey;

        try {
            // Método para obtener y guardar las noticias
            newsFetcher.fetchAndSaveNews(url);
            return "Noticias obtenidas para: " + searchQuery;
        } catch (Exception e) {
            return "Error al obtener noticias: " + e.getMessage();
        }
    }
}
