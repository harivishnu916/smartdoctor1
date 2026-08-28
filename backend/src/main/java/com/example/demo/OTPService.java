package com.example.demo;

import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OTPService {

    @Autowired
    private OtpRepository otpRepository;

    @Autowired
    private JavaMailSender mailSender;


    // =========================
    // SEND OTP
    // =========================

    @Transactional
    public void sendOtp(String email) {

        email = email.trim().toLowerCase();

        // Generate 6 digit OTP
        String otp = String.valueOf(
                100000 + new Random().nextInt(900000)
        );

        // 5 minutes expiry
        long expiryTime =
                System.currentTimeMillis()
                + (5 * 60 * 1000);


        // Delete old OTP
        otpRepository.deleteByEmail(email);


        // Create new OTP
        OtpEntity otpEntity =
                new OtpEntity();

        otpEntity.setEmail(email);
        otpEntity.setOtp(otp);
        otpEntity.setExpiryTime(expiryTime);


        // Save OTP
        otpRepository.save(otpEntity);


        // =========================
        // SEND EMAIL
        // =========================

        SimpleMailMessage message =
                new SimpleMailMessage();

        message.setTo(email);

        message.setSubject(
                "CareQueue - Password Reset OTP"
        );

        message.setText(
                "Your CareQueue password reset OTP is: "
                + otp
                + "\n\n"
                + "This OTP is valid for 5 minutes."
                + "\n\n"
                + "If you did not request this, "
                + "please ignore this email."
        );


        mailSender.send(message);


        System.out.println(
                "OTP sent: " + otp
        );

        System.out.println(
                "OTP email: " + email
        );

        System.out.println(
                "OTP expiry: " + expiryTime
        );
    }


    // =========================
    // VERIFY OTP
    // =========================

    @Transactional
    public boolean verifyOtp(
            String email,
            String otp) {

        email = email.trim().toLowerCase();
        otp = otp.trim();


        System.out.println(
                "VERIFY EMAIL: " + email
        );

        System.out.println(
                "VERIFY OTP: " + otp
        );


        Optional<OtpEntity> result =
                otpRepository.findByEmail(email);


        if (result.isEmpty()) {

            System.out.println(
                    "OTP NOT FOUND ❌"
            );

            return false;
        }


        OtpEntity otpEntity =
                result.get();


        System.out.println(
                "DB OTP: "
                + otpEntity.getOtp()
        );


        // =========================
        // CHECK EXPIRY
        // =========================

        if (
                System.currentTimeMillis()
                > otpEntity.getExpiryTime()
        ) {

            System.out.println(
                    "OTP EXPIRED ❌"
            );

            otpRepository.deleteByEmail(email);

            return false;
        }


        // =========================
        // CHECK OTP
        // =========================

        if (
                !otpEntity.getOtp()
                        .equals(otp)
        ) {

            System.out.println(
                    "OTP DOES NOT MATCH ❌"
            );

            return false;
        }


        // =========================
        // SUCCESS
        // =========================

        System.out.println(
                "OTP VERIFIED ✅"
        );


        // OTP can be deleted after successful use
        otpRepository.deleteByEmail(email);


        return true;
    }
}