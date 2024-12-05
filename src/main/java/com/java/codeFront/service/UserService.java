package com.java.codeFront.service;

import com.java.codeFront.model.User;
import com.java.codeFront.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user) {
        // Verificar si el nombre de usuario ya está en uso
        if (userRepository.existsByUserName(user.getUserName())) {
            throw new RuntimeException("Username already taken.");
        }
        // Guardar el usuario en la base de datos
        return userRepository.save(user);
    }
}
