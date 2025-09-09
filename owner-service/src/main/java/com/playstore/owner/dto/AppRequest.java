package com.playstore.owner.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class AppRequest {
    
    @NotBlank(message = "App name cannot be blank")
    @Size(min = 2, max = 100, message = "App name must be between 2 and 100 characters")
    private String name;
    
    @NotBlank(message = "Description cannot be blank")
    @Size(max = 1000, message = "Description must be less than 1000 characters")
    private String description;
    
    @NotBlank(message = "Version cannot be blank")
    private String version;
    
    @NotBlank(message = "Genre cannot be blank")
    private String genre;
    
    private String iconUrl;
    
    private boolean isVisible = true;
    
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
    
    public boolean isVisible() { return isVisible; }
    public void setVisible(boolean visible) { isVisible = visible; }
}