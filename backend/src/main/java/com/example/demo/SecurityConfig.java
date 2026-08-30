package com.example.demo;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;


@Configuration
public class SecurityConfig {


    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {


        http

            // =========================
            // CSRF
            // =========================

            .csrf(csrf -> csrf.disable())


            // =========================
            // CORS
            // =========================

            .cors(cors -> cors.configurationSource(corsConfigurationSource()))


            // =========================
            // AUTHORIZATION
            // =========================

            .authorizeHttpRequests(auth -> auth


                // =========================
                // USER APIs
                // =========================

                .requestMatchers(
                    "/api/users/signup",
                    "/api/users/login",
                    "/api/users/forgot-password",
                    "/api/users/verify-otp",
                    "/api/users/reset-password"
                ).permitAll()


                // =========================
                // DOCTOR APIs
                // =========================

                .requestMatchers(
                    "/api/doctors",
                    "/api/doctors/**"
                ).permitAll()


                // =========================
                // APPOINTMENT APIs
                // =========================

                .requestMatchers(
                    "/api/appointments",
                    "/api/appointments/**"
                ).permitAll()


                // =========================
                // MY APPOINTMENTS
                // =========================

                .requestMatchers(
                    "/api/my-appointments",
                    "/api/my-appointments/**"
                ).permitAll()


                // =========================
                // MY QUEUE
                // =========================

                .requestMatchers(
                    "/api/my-queue",
                    "/api/my-queue/**"
                ).permitAll()


                // =========================
                // DOCTOR QUEUE
                // =========================

                .requestMatchers(
                    "/api/doctor-queue",
                    "/api/doctor-queue/**"
                ).permitAll()


                // =========================
                // ALLOW OTHER REQUESTS
                // =========================

                .anyRequest().permitAll()

            );


        return http.build();
    }


    // =========================
    // CORS CONFIGURATION
    // =========================

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration config = new CorsConfiguration();

        config.setAllowedOriginPatterns(List.of("*"));

        config.setAllowedMethods(List.of(
            "GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"
        ));

        config.setAllowedHeaders(List.of("*"));

        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", config);

        return source;
    }
}

