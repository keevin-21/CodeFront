package com.java.codeFront.controller;

import com.java.codeFront.model.User;
import com.java.codeFront.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<Object> registerUser(@RequestBody User user) {
        try {
            // Llamamos al servicio para registrar el usuario
            userService.registerUser(user);
            // Devolvemos una respuesta exitosa
            return ResponseEntity.status(HttpStatus.CREATED).body(new ResponseMessage("User registered successfully!"));
        } catch (Exception e) {
            // En caso de error, devolvemos una respuesta con el error y el código de error
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseMessage("Error registering user: " + e.getMessage()));
        }
    }

    // Clase interna para estructurar la respuesta
    static class ResponseMessage {
        private String message;

        // Constructor
        public ResponseMessage(String message) {
            this.message = message;
        }

        // Getter
        public String getMessage() {
            return message;
        }

        // Setter
        public void setMessage(String message) {
            this.message = message;
        }
    }
}
