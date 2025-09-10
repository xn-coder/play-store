package com.playstore.userservice.controller;

import com.playstore.userservice.payload.request.LoginRequest;
import com.playstore.userservice.payload.request.SignupRequest;
import com.playstore.userservice.payload.response.JwtResponse;
import com.playstore.userservice.payload.response.MessageResponse;
import com.playstore.userservice.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/signin")
    public ResponseEntity<JwtResponse> authenticateUser(@RequestBody LoginRequest loginRequest) {
        return authService.authenticateUser(loginRequest.getUsername(), loginRequest.getPassword());
    }

    @PostMapping("/signup")
    public ResponseEntity<MessageResponse> registerUser(@RequestBody SignupRequest signupRequest) {
        return authService.registerUser(signupRequest.getUsername(), signupRequest.getPassword());
    }
}
