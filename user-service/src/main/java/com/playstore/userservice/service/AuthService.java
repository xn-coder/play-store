package com.playstore.userservice.service;

import com.playstore.userservice.payload.request.LoginRequest;
import com.playstore.userservice.payload.request.SignupRequest;
import com.playstore.userservice.payload.response.JwtResponse;
import com.playstore.userservice.payload.response.MessageResponse;
import org.springframework.http.ResponseEntity;

public interface AuthService {

    ResponseEntity<JwtResponse> authenticateUser(LoginRequest loginRequest);

    ResponseEntity<MessageResponse> registerUser(SignupRequest signUpRequest);
}
