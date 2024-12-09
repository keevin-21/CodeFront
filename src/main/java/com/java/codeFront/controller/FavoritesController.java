package com.java.codeFront.controller;

import com.java.codeFront.model.News;
import com.java.codeFront.model.UserFavorites;
import com.java.codeFront.model.Users;
import com.java.codeFront.repository.NewsRepository;
import com.java.codeFront.repository.UserFavoritesRepository;
import com.java.codeFront.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.ArrayList;

import java.util.Map;

@RestController
@RequestMapping("/favorites")
public class FavoritesController {
    @Autowired
    private UserFavoritesRepository userFavoritesRepository;

    @Autowired
    private NewsRepository newsRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/add")
    public ResponseEntity<String> addFavorite(@RequestBody Map<String, Object> payload) {
        int userId = (int) payload.get("userId");
        String title = (String) payload.get("title");
        String shortDescription = (String) payload.get("shortDescription");
        String author = (String) payload.get("author");
        String source = (String) payload.get("source");
        String url = (String) payload.get("url");
        String urlToImage = (String) payload.get("urlToImage");
        String publishedAt = (String) payload.get("publishedAt");
        String content = (String) payload.get("content");

        // Verificar si la noticia ya existe en la tabla `News`
        News news = newsRepository.findByUrl(url).orElse(null);
        if (news == null) {
            // Crear y guardar la noticia si no existe
            news = new News();
            news.setTitle(title);
            news.setShortDescription(shortDescription);
            news.setAuthor(author);
            news.setSource(source);
            news.setUrl(url);
            news.setUrlToImage(urlToImage);
            news.setPublishedAt(publishedAt);
            news.setContent(content);

            news = newsRepository.save(news); // Guardar y obtener el ID generado
        }

        // Verificar si ya existe el favorito
        boolean exists = userFavoritesRepository.existsByUser_UserIDAndNews_NewsID(userId, news.getNewsID());
        if (exists) {
            return ResponseEntity.badRequest().body("Favorite already exists");
        }

        Users user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        UserFavorites favorite = new UserFavorites();
        favorite.setUser(user); // Asigna el usuario existente
        favorite.setNews(news); // Asigna la noticia

        userFavoritesRepository.save(favorite); // Guarda el favorito
        return ResponseEntity.ok("Favorite added successfully!");
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<UserFavorites>> getFavorites(@PathVariable int userId) {
        System.out.println("Fetching favorites for user with ID: " + userId);  // Log para verificar el userId
        List<UserFavorites> favorites = userFavoritesRepository.findByUser_UserID(userId);
        if (favorites.isEmpty()) {
            return ResponseEntity.status(404).body(new ArrayList<>());  // Devuelve un 404 si no hay favoritos
        }
        return ResponseEntity.ok(favorites);
    }

    @DeleteMapping("/remove")
    public ResponseEntity<String> removeFavorite(@RequestBody Map<String, Object> payload) {
        int userId = (int) payload.get("userId");
        String newsUrl = (String) payload.get("newsUrl");

        // Buscar la noticia por su URL
        News news = newsRepository.findByUrl(newsUrl).orElse(null);
        if (news == null) {
            return ResponseEntity.badRequest().body("News not found.");
        }

        // Buscar el favorito usando userId y newsUrl
        UserFavorites favorite = userFavoritesRepository.findByUser_UserIDAndNews_NewsID(userId, news.getNewsID());
        if (favorite == null) {
            return ResponseEntity.badRequest().body("Favorite not found.");
        }

        // Eliminar el favorito
        userFavoritesRepository.delete(favorite);
        System.out.println("Favorite removed for userId: " + userId + " and newsId: " + news.getNewsID()); // Log para verificar la eliminación
        return ResponseEntity.ok("Favorite removed successfully!");
    }
}
