package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    // =========================
    // SIGNUP
    // =========================

    public UserEntity signup(UserEntity user) {

        if (repository.existsByEmail(
                user.getEmail())) {

            throw new RuntimeException(
                    "Email already registered"
            );
        }

        user.setRole("PATIENT");

        user.setPassword(
                passwordEncoder.encode(
                        user.getPassword()
                )
        );

        return repository.save(user);
    }


    // =========================
    // LOGIN
    // =========================

    public UserEntity login(
            String email,
            String password) {

        UserEntity user =
                repository.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Invalid email or password"
                                )
                        );


        // 🔐 Compare plain password
        // with BCrypt hash

        if (!passwordEncoder.matches(
                password,
                user.getPassword()
        )) {

            throw new RuntimeException(
                    "Invalid email or password"
            );
        }


        return user;
    }
}
