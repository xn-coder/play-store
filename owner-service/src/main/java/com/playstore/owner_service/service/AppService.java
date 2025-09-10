package com.playstore.owner_service.service;

import com.playstore.owner_service.dto.AppRequest;
import com.playstore.owner_service.entity.Application;
import com.playstore.owner_service.repository.AppRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppService {

    @Autowired
    private AppRepository appRepository;

    public Application addApp(AppRequest request, Long ownerId) {
        Application app = new Application();
        app.setName(request.getName());
        app.setDescription(request.getDescription());
        app.setCategory(request.getCategory());
        app.setOwnerId(ownerId);
        app.setVisible(true);

        // TODO: Send a notification to the notification service

        return appRepository.save(app);
    }

    public List<Application> getAppsByOwner(Long ownerId) {
        return appRepository.findByOwnerId(ownerId);
    }

    public Application updateApp(Long appId, AppRequest request, Long ownerId) {
        Application app = appRepository.findById(appId).orElseThrow(() -> new RuntimeException("App not found"));
        if (!app.getOwnerId().equals(ownerId)) {
            throw new RuntimeException("You are not the owner of this app");
        }
        app.setName(request.getName());
        app.setDescription(request.getDescription());
        app.setCategory(request.getCategory());
        return appRepository.save(app);
    }

    public void deleteApp(Long appId, Long ownerId) {
        Application app = appRepository.findById(appId).orElseThrow(() -> new RuntimeException("App not found"));
        if (!app.getOwnerId().equals(ownerId)) {
            throw new RuntimeException("You are not the owner of this app");
        }
        appRepository.deleteById(appId);
    }

    public Application toggleVisibility(Long appId, Long ownerId) {
        Application app = appRepository.findById(appId).orElseThrow(() -> new RuntimeException("App not found"));
        if (!app.getOwnerId().equals(ownerId)) {
            throw new RuntimeException("You are not the owner of this app");
        }
        app.setVisible(!app.isVisible());
        return appRepository.save(app);
    }
}
