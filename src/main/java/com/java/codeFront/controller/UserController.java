package com.java.codeFront.controller;

import com.java.codeFront.model.Users;
import com.java.codeFront.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")

public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<Object> registerUser(@RequestBody Users users) {
        try {
            // Llamamos al servicio para registrar el usuario
            userService.registerUser(users);
            // Devolvemos una respuesta exitosa
            return ResponseEntity.status(HttpStatus.CREATED).body(new ResponseMessage("User registered successfully!"));
        } catch (Exception e) {
            // En caso de error, devolvemos una respuesta con el error y el código de error
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseMessage("Error registering user: " + e.getMessage()));
        }
    }

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

//    @PostMapping("/login")
//    public ResponseEntity<Object> loginUser(@RequestBody Users users) {
//        try {
//            // Validar las credenciales llamando al servicio
//            boolean isValidUser = userService.validateUser(users.getUserName(), users.getUserPassword());
//
//            if (isValidUser) {
//                return ResponseEntity.ok(new ResponseMessage("Login successful!"));
//            } else {
//                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//                        .body(new ResponseMessage("Invalid username or password"));
//            }
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(new ResponseMessage("Error during login: " + e.getMessage()));
//        }
//    }


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