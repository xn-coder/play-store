package com.playstore.notification.repository;

import com.playstore.notification.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    
    List<Notification> findByRecipientEmailOrderBySentAtDesc(String recipientEmail);
    
    List<Notification> findAllByOrderBySentAtDesc();
    
    List<Notification> findByStatus(Notification.NotificationStatus status);
    
    List<Notification> findByType(Notification.NotificationType type);
}