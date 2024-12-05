package com.java.codeFront.controller;

import com.java.codeFront.model.Users;
import com.java.codeFront.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // Registro de usuario
    @PostMapping("/register")
    public ResponseEntity<Object> registerUser(@RequestBody Users users) {
        try {
            userService.registerUser(users);  // Llama al servicio para registrar al usuario
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ResponseMessage("User registered successfully!"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ResponseMessage("Error registering user: " + e.getMessage()));
        }
    }

    // Inicio de sesión de usuario
    @PostMapping("/login")
    public ResponseEntity<Object> loginUser(@RequestBody Users users) {
        try {
            Users loggedInUser = userService.loginUser(users.getUserName(), users.getUserPassword());
            if (loggedInUser != null) {
                // Crear un objeto con los datos del usuario
                Map<String, Object> response = new HashMap<>();
                response.put("userName", loggedInUser.getUserName());
                response.put("userId", loggedInUser.getUserID());
                return ResponseEntity.ok(response); // Enviar los datos al frontend
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new ResponseMessage("Invalid username or password."));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseMessage("Error: " + e.getMessage()));
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
