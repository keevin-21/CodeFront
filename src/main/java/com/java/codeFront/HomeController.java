package com.java.codeFront;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
	@GetMapping("/")
	public String home() {
		return "home";  // Aquí devuelve una vista llamada 'home.html'
	}
}
