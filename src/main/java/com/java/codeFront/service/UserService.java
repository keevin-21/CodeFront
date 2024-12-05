package com.java.codeFront.service;

import com.java.codeFront.model.Users;
import com.java.codeFront.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Método para registrar un usuario
    public Users registerUser(Users users) {
        if (userRepository.existsByUserName(users.getUserName())) {
            throw new RuntimeException("Username already taken.");
        }
        return userRepository.save(users);
    }

    // Método para iniciar sesión
    public Users loginUser(String userName, String userPassword) {
        return userRepository.findByUserNameAndUserPassword(userName, userPassword)
                .orElse(null);
    }
}
