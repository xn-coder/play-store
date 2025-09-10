package com.playstore.owner_service.service;

import com.playstore.owner_service.dto.AppRequest;
<<<<<<< HEAD
import com.playstore.owner_service.dto.AppResponse;
import com.playstore.owner_service.entity.App;
=======
import com.playstore.owner_service.entity.Application;
>>>>>>> ec1be3d313ee1c39d35ac9b91ab529fa692841fb
import com.playstore.owner_service.repository.AppRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
<<<<<<< HEAD
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AppService {
    
    @Autowired
    private AppRepository appRepository;
    
    public List<AppResponse> getAllVisibleApps() {
        return appRepository.findByVisibleTrue()
                .stream()
                .map(AppResponse::new)
                .collect(Collectors.toList());
    }
    
    public Optional<AppResponse> getAppById(Long id) {
        return appRepository.findById(id)
                .map(AppResponse::new);
    }
    
    public List<AppResponse> getAppsByOwner(Long ownerId) {
        return appRepository.findByOwnerId(ownerId)
                .stream()
                .map(AppResponse::new)
                .collect(Collectors.toList());
    }
    
    public List<AppResponse> searchApps(String query) {
        return appRepository.searchVisibleApps(query)
                .stream()
                .map(AppResponse::new)
                .collect(Collectors.toList());
    }
    
    public List<AppResponse> getAppsByGenre(String genre) {
        return appRepository.findByVisibleTrueAndGenre(genre)
                .stream()
                .map(AppResponse::new)
                .collect(Collectors.toList());
    }
    
    public AppResponse createApp(AppRequest request, Long ownerId) {
        App app = new App();
        app.setName(request.getName());
        app.setDescription(request.getDescription());
        app.setVersion(request.getVersion());
        app.setGenre(request.getGenre());
        app.setIconUrl(request.getIconUrl());
        app.setVisible(request.getVisible());
        app.setOwnerId(ownerId);
        
        App savedApp = appRepository.save(app);
        return new AppResponse(savedApp);
    }
    
    public AppResponse updateApp(Long id, AppRequest request, Long ownerId) {
        App app = appRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("App not found with id: " + id));
        
        if (!app.getOwnerId().equals(ownerId)) {
            throw new RuntimeException("You can only update your own apps");
        }
        
        app.setName(request.getName());
        app.setDescription(request.getDescription());
        app.setVersion(request.getVersion());
        app.setGenre(request.getGenre());
        app.setIconUrl(request.getIconUrl());
        app.setVisible(request.getVisible());
        
        App updatedApp = appRepository.save(app);
        return new AppResponse(updatedApp);
    }
    
    public void deleteApp(Long id, Long ownerId) {
        App app = appRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("App not found with id: " + id));
        
        if (!app.getOwnerId().equals(ownerId)) {
            throw new RuntimeException("You can only delete your own apps");
        }
        
        appRepository.delete(app);
    }
    
    public AppResponse toggleAppVisibility(Long id, boolean visible, Long ownerId) {
        App app = appRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("App not found with id: " + id));
        
        if (!app.getOwnerId().equals(ownerId)) {
            throw new RuntimeException("You can only update your own apps");
        }
        
        app.setVisible(visible);
        App updatedApp = appRepository.save(app);
        return new AppResponse(updatedApp);
    }
    
    public AppResponse incrementDownloadCount(Long id) {
        App app = appRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("App not found with id: " + id));
        
        app.setDownloadCount(app.getDownloadCount() + 1);
        App updatedApp = appRepository.save(app);
        return new AppResponse(updatedApp);
    }
}
=======

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
>>>>>>> ec1be3d313ee1c39d35ac9b91ab529fa692841fb
