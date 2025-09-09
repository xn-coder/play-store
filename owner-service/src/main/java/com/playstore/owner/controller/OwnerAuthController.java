package com.playstore.owner.controller;

import com.playstore.owner.dto.AuthResponse;
import com.playstore.owner.dto.OwnerLoginRequest;
import com.playstore.owner.dto.OwnerRegistrationRequest;
import com.playstore.owner.service.OwnerAuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/owners/auth")
@Tag(name = "Owner Authentication", description = "Owner authentication APIs")
@CrossOrigin(origins = "*")
public class OwnerAuthController {
    
    @Autowired
    private OwnerAuthService ownerAuthService;
    
    @PostMapping("/register")
    @Operation(summary = "Register a new owner")
    public ResponseEntity<AuthResponse> registerOwner(@Valid @RequestBody OwnerRegistrationRequest request) {
        AuthResponse response = ownerAuthService.registerOwner(request);
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/login")
    @Operation(summary = "Login owner")
    public ResponseEntity<AuthResponse> loginOwner(@Valid @RequestBody OwnerLoginRequest request) {
        AuthResponse response = ownerAuthService.loginOwner(request);
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/logout")
    @Operation(summary = "Logout owner")
    public ResponseEntity<String> logoutOwner() {
        return ResponseEntity.ok("Owner logged out successfully!");
    }
}