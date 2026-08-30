package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class LoginController {

    @Autowired
    private UserService service;

    @Autowired
    private OTPService otpService;


    // =========================
    // SIGNUP
    // =========================

    @PostMapping("/signup")
    public ResponseEntity<?> signup(
            @RequestBody UserEntity user) {

        try {

            return ResponseEntity.ok(
                    service.signup(user)
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }


    // =========================
    // LOGIN
    // =========================

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request) {

        try {

            UserEntity user =
                    service.login(
                            request.getEmail(),
                            request.getPassword()
                    );

            return ResponseEntity.ok(user);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }


    // =========================
    // SEND OTP
    // =========================

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(
            @RequestBody ForgotPasswordRequest request) {

        try {

            String email =
                    request.getEmail();

            // Check email
            service.checkEmail(email);

            // Generate + send OTP
            otpService.sendOtp(email);

            return ResponseEntity.ok(
                    "OTP sent successfully"
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }


    // =========================
    // VERIFY OTP
    // =========================

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(
            @RequestBody VerifyOTPRequest request) {

        try {

            boolean valid =
                    otpService.verifyOtp(
                            request.getEmail(),
                            request.getOtp()
                    );

            if (!valid) {

                return ResponseEntity
                        .badRequest()
                        .body("Invalid or expired OTP");
            }

            return ResponseEntity.ok(
                    "OTP verified successfully"
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }


    // =========================
    // RESET PASSWORD
    // =========================

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(
            @RequestBody  ForgotPasswordRequest request) {

        try {

            service.resetPassword(
                    request.getEmail(),
                    request.getNewPassword()
            );

            return ResponseEntity.ok(
                    "Password reset successfully"
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }
}
