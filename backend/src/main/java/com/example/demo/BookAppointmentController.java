package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/appointments")

public class BookAppointmentController {

    @Autowired
    private BookAppointmentService service;


    // SAVE APPOINTMENT
    @PostMapping
    public BookAppointmentEntity saveAppointment(
            @RequestBody BookAppointmentEntity appointment) {

        return service.saveAppointment(appointment);
    }


    // GET ALL
    @GetMapping
    public List<BookAppointmentEntity> getAppointments() {

        return service.getAppointments();
    }


    // GET BY ID
    @GetMapping("/{id}")
    public Optional<BookAppointmentEntity> getAppointmentById(
            @PathVariable int id) {

        return service.getAppointmentById(id);
    }


    // UPDATE
    @PutMapping
    public BookAppointmentEntity updateAppointment(
            @RequestBody BookAppointmentEntity appointment) {

        return service.updateAppointment(appointment);
    }


    // DELETE
   @PutMapping("/cancel/{id}")
public String cancelAppointment(
        @PathVariable int id) {

    return service.cancelAppointment(id);
}
}