package com.playstore.user.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class ReviewRequest {
    
    @NotNull(message = "App ID cannot be null")
    private Long appId;
    
    @Min(value = 1, message = "Rating must be at least 1")
    @Max(value = 5, message = "Rating must be at most 5")
    private Integer rating;
    
    @NotBlank(message = "Comment cannot be blank")
    private String comment;
    
    // Constructors
    public ReviewRequest() {}
    
    public ReviewRequest(Long appId, Integer rating, String comment) {
        this.appId = appId;
        this.rating = rating;
        this.comment = comment;
    }
    
    // Getters and Setters
    public Long getAppId() { return appId; }
    public void setAppId(Long appId) { this.appId = appId; }
    
    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }
    
    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }
}