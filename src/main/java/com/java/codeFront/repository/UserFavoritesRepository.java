package com.java.codeFront.repository;

import com.java.codeFront.model.UserFavorites;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserFavoritesRepository extends JpaRepository<UserFavorites, Integer> {
    List<UserFavorites> findByUser_UserID(int userID);
    boolean existsByUser_UserIDAndNews_NewsID(int userId, int newsId);

    List<UserFavorites> findByNews_NewsID(int newsId);

    UserFavorites findByUser_UserIDAndNews_NewsID(int userId, int newsId);
}