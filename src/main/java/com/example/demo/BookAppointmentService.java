package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookAppointmentService {

    @Autowired
    private AppointmentRepository repository;


    // SAVE
    public BookAppointmentEntity saveAppointment(
            BookAppointmentEntity appointment) {

        Integer lastToken =
                repository.findLastToken(appointment.getDate());

        int nextToken = lastToken + 1;

        appointment.setToken(nextToken);

        appointment.setStatus("BOOKED");

        return repository.save(appointment);
    }


    // GET ALL
    public List<BookAppointmentEntity> getAppointments() {

        return repository.findAll();
    }


    // GET BY ID
    public Optional<BookAppointmentEntity> getAppointmentById(
            int id) {

        return repository.findById(id);
    }


    // UPDATE
    public BookAppointmentEntity updateAppointment(
            BookAppointmentEntity appointment) {

        return repository.save(appointment);
    }


    // DELETE
   public String cancelAppointment(int id) {

    Optional<BookAppointmentEntity> appointment =
            repository.findById(id);

    if (appointment.isEmpty()) {
        return "Appointment not found";
    }

    BookAppointmentEntity existingAppointment =
            appointment.get();

    existingAppointment.setStatus("CANCELLED");

    repository.save(existingAppointment);

    return "Appointment cancelled successfully";
}
}