package com.playstore.notification.controller;

import com.playstore.notification.dto.NotificationRequest;
import com.playstore.notification.entity.Notification;
import com.playstore.notification.service.NotificationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@Tag(name = "Notifications", description = "Notification management APIs")
@CrossOrigin(origins = "*")
public class NotificationController {
    
    @Autowired
    private NotificationService notificationService;
    
    @PostMapping("/send")
    @Operation(summary = "Send a notification")
    public ResponseEntity<String> sendNotification(@Valid @RequestBody NotificationRequest request) {
        notificationService.sendNotification(request);
        return ResponseEntity.ok("Notification sent successfully");
    }
    
    @PostMapping("/download-notification")
    @Operation(summary = "Send download notification to app owner")
    public ResponseEntity<String> sendDownloadNotification(
            @RequestParam String ownerEmail,
            @RequestParam String appName,
            @RequestParam String downloaderInfo) {
        
        NotificationRequest request = new NotificationRequest();
        request.setRecipientEmail(ownerEmail);
        request.setSubject("App Downloaded: " + appName);
        request.setContent("Your app '" + appName + "' was downloaded by " + downloaderInfo);
        request.setType("DOWNLOAD");
        
        notificationService.sendNotification(request);
        return ResponseEntity.ok("Download notification sent");
    }
    
    @PostMapping("/app-update-notification")
    @Operation(summary = "Send app update notification to users")
    public ResponseEntity<String> sendAppUpdateNotification(
            @RequestParam String appName,
            @RequestParam String version,
            @RequestParam List<String> userEmails) {
        
        for (String email : userEmails) {
            NotificationRequest request = new NotificationRequest();
            request.setRecipientEmail(email);
            request.setSubject("App Update Available: " + appName);
            request.setContent("A new version (" + version + ") of " + appName + " is now available!");
            request.setType("UPDATE");
            
            notificationService.sendNotification(request);
        }
        
        return ResponseEntity.ok("Update notifications sent to " + userEmails.size() + " users");
    }
    
    @GetMapping("/history")
    @Operation(summary = "Get notification history")
    public ResponseEntity<List<Notification>> getNotificationHistory() {
        List<Notification> notifications = notificationService.getNotificationHistory();
        return ResponseEntity.ok(notifications);
    }
    
    @GetMapping("/health")
    @Operation(summary = "Health check")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("Notification service is running");
    }
}