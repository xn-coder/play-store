package com.playstore.owner.service;

import com.playstore.owner.dto.AppRequest;
import com.playstore.owner.entity.App;
import com.playstore.owner.entity.Owner;
import com.playstore.owner.repository.AppRepository;
import com.playstore.owner.repository.OwnerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppService {
    
    @Autowired
    private AppRepository appRepository;
    
    @Autowired
    private OwnerRepository ownerRepository;
    
    public List<App> getAllVisibleApps() {
        return appRepository.findByIsVisibleTrue();
    }
    
    public App getAppById(Long id) {
        return appRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("App not found with id: " + id));
    }
    
    public List<App> searchApps(String query) {
        return appRepository.searchVisibleApps(query);
    }
    
    public List<App> getAppsByGenre(String genre) {
        return appRepository.findByGenreAndIsVisibleTrue(genre);
    }
    
    public void incrementDownloadCount(Long appId) {
        App app = getAppById(appId);
        app.incrementDownloadCount();
        appRepository.save(app);
    }
    
    public App createApp(AppRequest request, Long ownerId) {
        Owner owner = ownerRepository.findById(ownerId)
                .orElseThrow(() -> new RuntimeException("Owner not found"));
        
        App app = new App(request.getName(), request.getDescription(), 
                         request.getVersion(), request.getGenre(), owner);
        app.setIconUrl(request.getIconUrl());
        app.setVisible(request.isVisible());
        
        return appRepository.save(app);
    }
    
    public App updateApp(Long id, AppRequest request, Long ownerId) {
        App app = getAppById(id);
        
        if (!app.getOwner().getId().equals(ownerId)) {
            throw new RuntimeException("Not authorized to update this app");
        }
        
        app.setName(request.getName());
        app.setDescription(request.getDescription());
        app.setVersion(request.getVersion());
        app.setGenre(request.getGenre());
        app.setIconUrl(request.getIconUrl());
        app.setVisible(request.isVisible());
        
        return appRepository.save(app);
    }
    
    public void deleteApp(Long id, Long ownerId) {
        App app = getAppById(id);
        
        if (!app.getOwner().getId().equals(ownerId)) {
            throw new RuntimeException("Not authorized to delete this app");
        }
        
        appRepository.delete(app);
    }
    
    public List<App> getOwnerApps(Long ownerId) {
        return appRepository.findByOwnerId(ownerId);
    }
}