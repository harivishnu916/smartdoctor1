package com.example.demo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VerifyOTPRequest {

    private String email;
    private String otp;
}
