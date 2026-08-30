package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class QueueService {

    @Autowired
    private QueueRepository repository;

    @Autowired
    private AppointmentRepository1 appointmentRepository;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;


    // SAVE QUEUE
    public QueueEntity1 saveQueue(QueueEntity1 queue) {

        return repository.save(queue);
    }


    // GET ALL QUEUES
    public List<QueueEntity1> getQueues() {

        return repository.findAll();
    }


    // GET QUEUE BY ID
    public Optional<QueueEntity1> getQueueById(int id) {

        return repository.findById(id);
    }


    // UPDATE QUEUE
    public QueueEntity1 updateQueue(
            QueueEntity1 queue) {

        return repository.save(queue);
    }


    // DELETE QUEUE
    public String deleteQueue(int id) {

        repository.deleteById(id);

        return "Queue deleted successfully";
    }


    // GET QUEUE STATUS
    public Map<String, Object> getQueueStatus(
            String doctorName,
            String date,
            int token) {

        Map<String, Object> result =
                new HashMap<>();


        // Find ACTIVE queue
        // for doctor + date
        List<QueueEntity1> queues =
                repository.findByDoctorNameAndDateAndStatus(
                        doctorName,
                        date,
                        "ACTIVE"
                );


        int currentToken = 1;


        if (!queues.isEmpty()) {

            QueueEntity1 queue =
                    queues.get(0);

            currentToken =
                    queue.getCurrentToken();
        }


        int peopleBefore =
                Math.max(
                        0,
                        token - currentToken
                );


        result.put(
                "doctorName",
                doctorName
        );

        result.put(
                "currentToken",
                currentToken
        );

        result.put(
                "yourToken",
                token
        );

        result.put(
                "peopleBefore",
                peopleBefore
        );


        return result;
    }


    // REFRESH QUEUE
    // Update total patients
    // from BOOKED appointments
    public QueueEntity1 refreshQueue(int id) {

        Optional<QueueEntity1> optionalQueue =
                repository.findById(id);


        if (optionalQueue.isEmpty()) {

            return null;
        }


        QueueEntity1 queue =
                optionalQueue.get();


        long totalPatients =
                appointmentRepository
                        .countByDoctorNameAndDateAndStatus(
                                queue.getDoctorName(),
                                queue.getDate(),
                                "BOOKED"
                        );


        queue.setTotalPatients(
                (int) totalPatients
        );


        return repository.save(queue);
    }


    // NEXT PATIENT
    public QueueEntity1 nextToken(int id) {

        Optional<QueueEntity1> optionalQueue =
                repository.findById(id);


        if (optionalQueue.isEmpty()) {

            return null;
        }


        QueueEntity1 existingQueue =
                optionalQueue.get();


        String doctorName =
                existingQueue.getDoctorName();

        String date =
                existingQueue.getDate();


        // Count BOOKED appointments
        // for this doctor + date
        long totalPatients =
                appointmentRepository
                        .countByDoctorNameAndDateAndStatus(
                                doctorName,
                                date,
                                "BOOKED"
                        );


        // Update total patients
        existingQueue.setTotalPatients(
                (int) totalPatients
        );


        int currentToken =
                existingQueue.getCurrentToken();


        // NO PATIENTS
        if (totalPatients == 0) {

            existingQueue.setStatus(
                    "COMPLETED"
            );


            QueueEntity1 savedQueue =
                    repository.save(
                            existingQueue
                    );


            // WebSocket update
            sendQueueUpdate(savedQueue);


            return savedQueue;
        }


        // LAST PATIENT
        if (currentToken >= totalPatients) {

            existingQueue.setCurrentToken(
                    (int) totalPatients
            );

            existingQueue.setStatus(
                    "COMPLETED"
            );


            QueueEntity1 savedQueue =
                    repository.save(
                            existingQueue
                    );


            // WebSocket update
            sendQueueUpdate(savedQueue);


            return savedQueue;
        }


        // MOVE TO NEXT TOKEN
        existingQueue.setCurrentToken(
                currentToken + 1
        );


        QueueEntity1 savedQueue =
                repository.save(
                        existingQueue
                );


        // WebSocket update
        sendQueueUpdate(savedQueue);


        return savedQueue;
    }


    // SEND QUEUE UPDATE
    private void sendQueueUpdate(
            QueueEntity1 queue) {

        messagingTemplate.convertAndSend(
                "/topic/queue/" +
                queue.getDoctorName(),
                queue
        );
    }
}