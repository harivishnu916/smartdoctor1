package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping("/api/doctors")
public class AppointmentController {

    @Autowired
    AppointmentService service;


   
    @PostMapping
    public AppointmentEntity saveDoctor(
            @RequestBody AppointmentEntity doctor) {

        return service.saveDoctor(doctor);
    }


   
    @GetMapping
    public List<AppointmentEntity> getDoctors() {

        return service.getDoctors();
    }



    @GetMapping("/{id}")
    public Optional<AppointmentEntity> getDoctorById(
            @PathVariable int id) {

        return service.getDoctorById(id);
    }


    @PutMapping
    public AppointmentEntity updateDoctor(
            @RequestBody AppointmentEntity doctor) {

        return service.updateDoctor(doctor);
    }



    @DeleteMapping("/{id}")
    public String deleteDoctor(
            @PathVariable int id) {

        return service.deleteDoctor(id);
    }
}
