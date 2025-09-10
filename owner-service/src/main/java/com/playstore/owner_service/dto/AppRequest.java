package com.playstore.owner_service.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class AppRequest {
    
    @NotBlank(message = "App name cannot be blank")
    @Size(min = 1, max = 100, message = "App name must be between 1 and 100 characters")
    private String name;
    
    @NotBlank(message = "Description cannot be blank")
    @Size(min = 10, max = 1000, message = "Description must be between 10 and 1000 characters")
    private String description;
    
    @NotBlank(message = "Version cannot be blank")
    private String version;
    
    @NotBlank(message = "Genre cannot be blank")
    private String genre;
    
    private String iconUrl;
    
    private Boolean visible = true;
    
    // Constructors
    public AppRequest() {}
    
    public AppRequest(String name, String description, String version, String genre) {
        this.name = name;
        this.description = description;
        this.version = version;
        this.genre = genre;
    }
    
    // Getters and Setters
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
}
