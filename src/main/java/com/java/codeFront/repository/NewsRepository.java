package com.java.codeFront.repository;

import com.java.codeFront.model.News;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface NewsRepository extends JpaRepository<News, Integer> {
    Optional<News> findByUrl(String url);
}