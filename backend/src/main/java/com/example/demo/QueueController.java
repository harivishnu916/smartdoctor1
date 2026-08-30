package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/queue")

public class QueueController {

    @Autowired
    private QueueService service;


    // CREATE QUEUE
    @PostMapping
    public QueueEntity1 saveQueue(
            @RequestBody QueueEntity1 queue) {

        return service.saveQueue(queue);
    }


    // GET ALL QUEUES
    @GetMapping
    public List<QueueEntity1> getQueues() {

        return service.getQueues();
    }


    // QUEUE STATUS
    @GetMapping("/status")
    public Map<String, Object> getQueueStatus(
            @RequestParam String doctorName,
            @RequestParam String date,
            @RequestParam int token) {

        return service.getQueueStatus(
                doctorName,
                date,
                token
        );
    }


    // NEXT PATIENT
    @PutMapping("/next/{id}")
    public QueueEntity1 nextToken(
            @PathVariable int id) {

        return service.nextToken(id);
    }


    // GET QUEUE BY ID
    @GetMapping("/{id}")
    public Optional<QueueEntity1> getQueueById(
            @PathVariable int id) {

        return service.getQueueById(id);
    }


    // UPDATE QUEUE
    @PutMapping
    public QueueEntity1 updateQueue(
            @RequestBody QueueEntity1 queue) {

        return service.updateQueue(queue);
    }
    @PutMapping("/refresh/{id}")
public QueueEntity1 refreshQueue(
        @PathVariable int id) {

    return service.refreshQueue(id);
}


    // DELETE QUEUE
    @DeleteMapping("/{id}")
    public String deleteQueue(
            @PathVariable int id) {

        return service.deleteQueue(id);
    }
}
