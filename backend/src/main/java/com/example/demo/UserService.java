package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    // =========================
    // SIGNUP
    // =========================

    public UserEntity signup(UserEntity user) {

        if (repository.existsByEmail(user.getEmail())) {

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


    // =========================
    // CHECK EMAIL
    // =========================

    public void checkEmail(String email) {

        repository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Email not found"
                        )
                );
    }


    // =========================
    // RESET PASSWORD
    // =========================

    public void resetPassword(
            String email,
            String newPassword) {

        UserEntity user =
                repository.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Email not found"
                                )
                        );

        user.setPassword(
                passwordEncoder.encode(
                        newPassword
                )
        );

        repository.save(user);
    }
}
