package com.playstore.owner_service.controller;

import com.playstore.owner_service.dto.OwnerLoginRequest;
import com.playstore.owner_service.dto.OwnerRegistrationRequest;
import com.playstore.owner_service.entity.Owner;
import com.playstore.owner_service.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/owners/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<Owner> register(@RequestBody OwnerRegistrationRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody OwnerLoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
}
