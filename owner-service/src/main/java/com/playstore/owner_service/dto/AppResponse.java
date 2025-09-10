package com.playstore.owner_service.dto;

import com.playstore.owner_service.entity.App;
import java.time.LocalDateTime;

public class AppResponse {
    
    private Long id;
    private String name;
    private String description;
    private String version;
    private String genre;
    private String iconUrl;
    private Boolean visible;
    private Long downloadCount;
    private LocalDateTime releaseDate;
    private Long ownerId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // Constructors
    public AppResponse() {}
    
    public AppResponse(App app) {
        this.id = app.getId();
        this.name = app.getName();
        this.description = app.getDescription();
        this.version = app.getVersion();
        this.genre = app.getGenre();
        this.iconUrl = app.getIconUrl();
        this.visible = app.getVisible();
        this.downloadCount = app.getDownloadCount();
        this.releaseDate = app.getReleaseDate();
        this.ownerId = app.getOwnerId();
        this.createdAt = app.getCreatedAt();
        this.updatedAt = app.getUpdatedAt();
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public String getVersion() { return version; }
    public void setVersion(String version) { this.version = version; }
    
    public String getGenre() { return genre; }
    public void setGenre(String genre) { this.genre = genre; }
    
    public String getIconUrl() { return iconUrl; }
    public void setIconUrl(String iconUrl) { this.iconUrl = iconUrl; }
    
    public Boolean getVisible() { return visible; }
    public void setVisible(Boolean visible) { this.visible = visible; }
    
    public Long getDownloadCount() { return downloadCount; }
    public void setDownloadCount(Long downloadCount) { this.downloadCount = downloadCount; }
    
    public LocalDateTime getReleaseDate() { return releaseDate; }
    public void setReleaseDate(LocalDateTime releaseDate) { this.releaseDate = releaseDate; }
    
    public Long getOwnerId() { return ownerId; }
    public void setOwnerId(Long ownerId) { this.ownerId = ownerId; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}