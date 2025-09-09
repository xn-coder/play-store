package com.playstore.owner.service;

import com.playstore.owner.dto.AuthResponse;
import com.playstore.owner.dto.OwnerLoginRequest;
import com.playstore.owner.dto.OwnerRegistrationRequest;
import com.playstore.owner.entity.Owner;
import com.playstore.owner.repository.OwnerRepository;
import com.playstore.owner.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class OwnerAuthService {
    
    @Autowired
    private OwnerRepository ownerRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    public AuthResponse registerOwner(OwnerRegistrationRequest request) {
        // Check if username or email already exists
        if (ownerRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists!");
        }
        
        if (ownerRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists!");
        }
        
        // Create new owner
        Owner owner = new Owner();
        owner.setUsername(request.getUsername());
        owner.setEmail(request.getEmail());
        owner.setPassword(passwordEncoder.encode(request.getPassword()));
        owner.setCompanyName(request.getCompanyName());
        
        Owner savedOwner = ownerRepository.save(owner);
        
        // Generate JWT token
        String token = jwtTokenProvider.generateToken(savedOwner.getUsername(), "OWNER");
        
        return new AuthResponse(savedOwner.getId(), savedOwner.getUsername(), 
                              savedOwner.getEmail(), savedOwner.getCompanyName(), token);
    }
    
    public AuthResponse loginOwner(OwnerLoginRequest request) {
        Authentication authentication = authenticationManager
            .authenticate(new UsernamePasswordAuthenticationToken(
                request.getUsername(),
                request.getPassword()
            ));
        
        Owner owner = ownerRepository.findByUsername(request.getUsername())
            .orElseThrow(() -> new RuntimeException("Owner not found"));
        
        String token = jwtTokenProvider.generateToken(owner.getUsername(), "OWNER");
        
        return new AuthResponse(owner.getId(), owner.getUsername(), 
                              owner.getEmail(), owner.getCompanyName(), token);
    }
}