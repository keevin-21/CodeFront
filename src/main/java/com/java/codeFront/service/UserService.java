package com.java.codeFront.service;

import com.java.codeFront.model.Users;
import com.java.codeFront.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Users registerUser(Users users) {
        // Verificar si el nombre de usuario ya está en uso
        if (userRepository.existsByUserName(users.getUserName())) {
            throw new RuntimeException("Username already taken.");
        }
        // Guardar el usuario en la base de datos
        return userRepository.save(users);
    }

    // Método para iniciar sesión
    public Users loginUser(String userName, String userPassword) {
        return userRepository.findByUserNameAndUserPassword(userName, userPassword)
                .orElse(null);
    }
}