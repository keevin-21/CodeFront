package com.java.codeFront.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PageController {
	@GetMapping("/api/hello")
	public String sayHello() {
		return "Hello from Backend!";
	}
}

