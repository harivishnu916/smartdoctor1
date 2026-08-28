package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QueueRepository
        extends JpaRepository<QueueEntity1, Integer> {

    List<QueueEntity1> findByDoctorNameAndDateAndStatus(
            String doctorName,
            String date,
            String status
    );
}