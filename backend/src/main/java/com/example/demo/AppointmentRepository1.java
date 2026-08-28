package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AppointmentRepository1
        extends JpaRepository<BookAppointmentEntity, Integer> {

    List<BookAppointmentEntity> findByDateAndStatus(
            String date,
            String status
    );

    long countByDateAndStatus(
            String date,
            String status
    );

    long countByDoctorNameAndDateAndStatus(
            String doctorName,
            String date,
            String status
    );
}