package com.example.demo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public interface OtpRepository
        extends JpaRepository<OtpEntity, Integer> {

    Optional<OtpEntity> findByEmail(String email);

    @Transactional
    void deleteByEmail(String email);
}
