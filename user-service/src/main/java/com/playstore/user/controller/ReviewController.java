package com.playstore.user.controller;

import com.playstore.user.dto.ReviewRequest;
import com.playstore.user.entity.Review;
import com.playstore.user.service.ReviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users/reviews")
@Tag(name = "Reviews", description = "User review APIs")
@CrossOrigin(origins = "*")
public class ReviewController {
    
    @Autowired
    private ReviewService reviewService;
    
    @PostMapping
    @PreAuthorize("hasRole('USER')")
    @Operation(summary = "Create a new review")
    public ResponseEntity<Review> createReview(@Valid @RequestBody ReviewRequest request) {
        Review review = reviewService.createReview(request);
        return ResponseEntity.ok(review);
    }
    
    @GetMapping("/app/{appId}")
    @Operation(summary = "Get reviews for an app")
    public ResponseEntity<List<Review>> getReviewsByAppId(@PathVariable Long appId) {
        List<Review> reviews = reviewService.getReviewsByAppId(appId);
        return ResponseEntity.ok(reviews);
    }
    
    @GetMapping("/my-reviews")
    @PreAuthorize("hasRole('USER')")
    @Operation(summary = "Get my reviews")
    public ResponseEntity<List<Review>> getMyReviews() {
        List<Review> reviews = reviewService.getMyReviews();
        return ResponseEntity.ok(reviews);
    }
    
    @GetMapping("/app/{appId}/average-rating")
    @Operation(summary = "Get average rating for an app")
    public ResponseEntity<Double> getAverageRating(@PathVariable Long appId) {
        Double averageRating = reviewService.getAverageRating(appId);
        return ResponseEntity.ok(averageRating != null ? averageRating : 0.0);
    }
}