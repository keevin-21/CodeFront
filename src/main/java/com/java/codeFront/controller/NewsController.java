package com.java.codeFront.controller;

import com.java.codeFront.model.News;
import com.java.codeFront.service.NewsFetcher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/news")
public class NewsController {

    @Autowired
    private NewsFetcher newsFetcher;

    @Value("${newsapi.key}")
    private String apiKey;

    private final String COMMON_URL = "https://newsapi.org/v2/everything";

    // Endpoint para obtener noticias de tecnología al inicio
    @GetMapping("/home")
    public List<News> getTechNews() {
        // Construir la URL para obtener noticias de tecnología en inglés
        String url = COMMON_URL + "?q=technology&language=en&apiKey=" + apiKey;

        try {
            // Llamar al método para obtener y guardar las noticias
            List<News> newsList = newsFetcher.fetchAndSaveNews(url);
            return newsList;  // Devuelve la lista de noticias
        } catch (Exception e) {
            throw new RuntimeException("Error al obtener noticias: " + e.getMessage());
        }
    }


    // Endpoint para obtener y guardar noticias basado en un término de búsqueda
    @PostMapping("/save")
    public String fetchAndSaveNews(@RequestParam String searchQuery) {
        String url = COMMON_URL + "?q=technology+" + searchQuery.replace(" ", "+") + "&language=en&apiKey=" + apiKey;
        try {
            newsFetcher.fetchAndSaveNews(url);
            return "Noticias obtenidas y guardadas para el término: " + searchQuery;
        } catch (Exception e) {
            return "Error al guardar noticias: " + e.getMessage();
        }
    }
    public String searchNewsFromConsole(@RequestParam String searchQuery) {
        // Modificamos la URL para buscar solo noticias sobre tecnología y en inglés
        String url = COMMON_URL + "?q=technology+" + searchQuery.replace(" ", "+") + "&language=en&apiKey=" + apiKey;
        try {
            // Método para obtener y guardar las noticias
            newsFetcher.fetchAndSaveNews(url);
            return "Noticias de tecnología en inglés obtenidas para: " + searchQuery;
        } catch (Exception e) {
            return "Error al obtener noticias: " + e.getMessage();
        }
    }
}