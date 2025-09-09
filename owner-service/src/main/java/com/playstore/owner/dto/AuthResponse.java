package com.playstore.owner.dto;

public class AuthResponse {
    
    private Long id;
    private String username;
    private String email;
    private String companyName;
    private String token;
    
    // Constructors
    public AuthResponse() {}
    
    public AuthResponse(Long id, String username, String email, String companyName, String token) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.companyName = companyName;
        this.token = token;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }
    
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
}