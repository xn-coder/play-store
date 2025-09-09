package com.playstore.notification.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
public class Notification {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Recipient email is required")
    @Email(message = "Valid email is required")
    @Column(name = "recipient_email")
    private String recipientEmail;
    
    @NotBlank(message = "Subject is required")
    private String subject;
    
    @NotBlank(message = "Content is required")
    @Column(length = 2000)
    private String content;
    
    @Column(name = "sent_at")
    private LocalDateTime sentAt;
    
    @Enumerated(EnumType.STRING)
    private NotificationType type;
    
    @Enumerated(EnumType.STRING)
    private NotificationStatus status;
    
    @Column(name = "error_message")
    private String errorMessage;
    
    public enum NotificationType {
        DOWNLOAD, UPDATE, REGISTRATION, GENERAL
    }
    
    public enum NotificationStatus {
        PENDING, SENT, FAILED
    }
    
    // Constructors
    public Notification() {
        this.sentAt = LocalDateTime.now();
        this.status = NotificationStatus.PENDING;
        this.type = NotificationType.GENERAL;
    }

    public Notification(String recipientEmail, String subject, String content, NotificationType type) {
        this();
        this.recipientEmail = recipientEmail;
        this.subject = subject;
        this.content = content;
        this.type = type;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getRecipientEmail() { return recipientEmail; }
    public void setRecipientEmail(String recipientEmail) { this.recipientEmail = recipientEmail; }
    
    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }
    
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    
    public LocalDateTime getSentAt() { return sentAt; }
    public void setSentAt(LocalDateTime sentAt) { this.sentAt = sentAt; }
    
    public NotificationType getType() { return type; }
    public void setType(NotificationType type) { this.type = type; }
    
    public NotificationStatus getStatus() { return status; }
    public void setStatus(NotificationStatus status) { this.status = status; }
    
    public String getErrorMessage() { return errorMessage; }
    public void setErrorMessage(String errorMessage) { this.errorMessage = errorMessage; }
}