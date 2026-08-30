package com.example.demo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentEntity {

   @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)

private Integer id;
    private String name;
    private String email;
    private Long  number;
    private String specialization;
   private Integer experience;
    boolean available;
    
}
