package com.playstore.owner_service.service;

import com.playstore.owner_service.dto.OwnerLoginRequest;
import com.playstore.owner_service.dto.OwnerRegistrationRequest;
import com.playstore.owner_service.entity.Owner;
import com.playstore.owner_service.repository.OwnerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private OwnerRepository ownerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Owner register(OwnerRegistrationRequest request) {
        Owner owner = new Owner();
        owner.setUsername(request.getUsername());
        owner.setPassword(passwordEncoder.encode(request.getPassword()));
        owner.setEmail(request.getEmail());
        return ownerRepository.save(owner);
    }

    public String login(OwnerLoginRequest request) {
        Owner owner = ownerRepository.findByUsername(request.getUsername()).orElseThrow(() -> new RuntimeException("Owner not found"));
        if (passwordEncoder.matches(request.getPassword(), owner.getPassword())) {
            // In a real application, generate a JWT token
            return "Login successful";
        } else {
            throw new RuntimeException("Invalid credentials");
        }
    }
}
