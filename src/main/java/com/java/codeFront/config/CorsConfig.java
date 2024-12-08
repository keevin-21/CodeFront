package com.java.codeFront.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Configura CORS globalmente
        registry.addMapping("/**") // Permite todas las rutas (puedes especificar rutas más específicas si lo prefieres)
                .allowedOrigins("http://localhost:3000") // Permite solicitudes solo desde el frontend (puedes agregar más orígenes si es necesario)
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Métodos HTTP permitidos
                .allowedHeaders("Content-Type", "Authorization") // Encabezados permitidos
                .allowCredentials(true); // Permite enviar cookies de autenticación (si es necesario)
    }
}
