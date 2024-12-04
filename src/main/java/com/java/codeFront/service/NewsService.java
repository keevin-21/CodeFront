package com.java.codeFront.service;

import com.java.codeFront.model.News;
import com.java.codeFront.repository.NewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NewsService {

    @Autowired
    private NewsRepository newsRepository;

    public List<News> getAllNews() {
        return newsRepository.findAll();
    }

    public News saveNews(News news) {
        if (newsRepository.existsById(news.getNewsID())) {
            return null; // Evitar duplicados
        }
        return newsRepository.save(news);
    }
}