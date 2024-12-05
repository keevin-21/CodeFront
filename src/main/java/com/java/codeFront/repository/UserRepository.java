package com.java.codeFront.repository;

import com.java.codeFront.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<Users, Integer> {
    boolean existsByUserName(String userName); // Comprobar si existe un usuario
}