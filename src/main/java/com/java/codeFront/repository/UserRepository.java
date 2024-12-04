package com.java.codeFront.repository;

import com.java.codeFront.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
}