package com.java.codeFront.controller;

import com.java.codeFront.model.User;
import com.java.codeFront.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {
        try {
            userService.registerUser(user);
            return "User registered successfully!";
        } catch (Exception e) {
            return "Error registering user: " + e.getMessage();
        }
    }
}
