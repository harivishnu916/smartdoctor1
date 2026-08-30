package com.example.demo;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;


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
}

