package com.java.codeFront.repository;

import com.java.codeFront.model.UserBookmark;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserBookmarkRepository extends JpaRepository<UserBookmark, Integer> {
}
