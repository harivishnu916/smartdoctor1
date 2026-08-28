package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AppointmentRepository
        extends JpaRepository<BookAppointmentEntity, Integer> {

    @Query("""
        SELECT COALESCE(MAX(a.token), 0)
        FROM BookAppointmentEntity a
        WHERE a.date = :date
    """)
    Integer findLastToken(String date);
}
