package com.playstore.notification.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class NotificationRequest {
    
    @NotBlank(message = "Recipient email is required")
    @Email(message = "Valid email is required")
    private String recipientEmail;
    
    @NotBlank(message = "Subject is required")
    private String subject;
    
    @NotBlank(message = "Content is required")
    private String content;
    
    private String type = "GENERAL";
    
    // Constructors
    public NotificationRequest() {}
    
    public NotificationRequest(String recipientEmail, String subject, String content) {
        this.recipientEmail = recipientEmail;
        this.subject = subject;
        this.content = content;
    }
    
    // Getters and Setters
    public String getRecipientEmail() { return recipientEmail; }
    public void setRecipientEmail(String recipientEmail) { this.recipientEmail = recipientEmail; }
    
    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }
    
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
}