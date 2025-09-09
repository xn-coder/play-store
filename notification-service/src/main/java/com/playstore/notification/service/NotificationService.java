package com.playstore.notification.service;

import com.playstore.notification.dto.NotificationRequest;
import com.playstore.notification.entity.Notification;
import com.playstore.notification.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {
    
    @Autowired
    private NotificationRepository notificationRepository;
    
    @Autowired(required = false)  // Make optional for development
    private JavaMailSender mailSender;
    
    public void sendNotification(NotificationRequest request) {
        Notification notification = new Notification(
            request.getRecipientEmail(),
            request.getSubject(),
            request.getContent(),
            Notification.NotificationType.valueOf(request.getType().toUpperCase())
        );
        
        try {
            // Save notification to database first
            notification = notificationRepository.save(notification);
            
            // Send email if mail sender is configured
            if (mailSender != null) {
                SimpleMailMessage message = new SimpleMailMessage();
                message.setTo(request.getRecipientEmail());
                message.setSubject(request.getSubject());
                message.setText(request.getContent());
                message.setFrom("playstore@example.com");
                
                mailSender.send(message);
                notification.setStatus(Notification.NotificationStatus.SENT);
            } else {
                // For development - just mark as sent without actually sending
                notification.setStatus(Notification.NotificationStatus.SENT);
                System.out.println("Email would be sent to: " + request.getRecipientEmail());
                System.out.println("Subject: " + request.getSubject());
                System.out.println("Content: " + request.getContent());
            }
            
        } catch (Exception e) {
            notification.setStatus(Notification.NotificationStatus.FAILED);
            notification.setErrorMessage(e.getMessage());
            System.err.println("Failed to send notification: " + e.getMessage());
        } finally {
            notificationRepository.save(notification);
        }
    }
    
    public List<Notification> getNotificationHistory() {
        return notificationRepository.findAllByOrderBySentAtDesc();
    }
    
    public List<Notification> getNotificationsByEmail(String email) {
        return notificationRepository.findByRecipientEmailOrderBySentAtDesc(email);
    }
    
    public long getNotificationCount() {
        return notificationRepository.count();
    }
}