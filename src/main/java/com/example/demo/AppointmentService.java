package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRespository repository;


    // SAVE DOCTOR
    public AppointmentEntity saveDoctor(
            AppointmentEntity doctor) {

        return repository.save(doctor);
    }


    // GET ALL DOCTORS
    public List<AppointmentEntity> getDoctors() {

        return repository.findAll();
    }


    // GET DOCTOR BY ID
    public Optional<AppointmentEntity> getDoctorById(
            int id) {

        return repository.findById(id);
    }


    // UPDATE DOCTOR
    public AppointmentEntity updateDoctor(
            AppointmentEntity doctor) {

        return repository.save(doctor);
    }


    // DELETE DOCTOR
    public String deleteDoctor(int id) {

        repository.deleteById(id);

        return "Doctor deleted successfully";
    }
}
