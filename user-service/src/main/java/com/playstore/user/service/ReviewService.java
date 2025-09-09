package com.playstore.user.service;

import com.playstore.user.dto.ReviewRequest;
import com.playstore.user.entity.Review;
import com.playstore.user.entity.User;
import com.playstore.user.exception.ReviewAlreadyExistsException;
import com.playstore.user.repository.ReviewRepository;
import com.playstore.user.repository.UserRepository;
import com.playstore.user.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {
    
    @Autowired
    private ReviewRepository reviewRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    public Review createReview(ReviewRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        
        if (reviewRepository.existsByUserIdAndAppId(userPrincipal.getId(), request.getAppId())) {
            throw new ReviewAlreadyExistsException("You have already reviewed this app");
        }
        
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Review review = new Review(user, request.getAppId(), request.getRating(), request.getComment());
        return reviewRepository.save(review);
    }
    
    public List<Review> getReviewsByAppId(Long appId) {
        return reviewRepository.findByAppId(appId);
    }
    
    public List<Review> getMyReviews() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        return reviewRepository.findByUserId(userPrincipal.getId());
    }
    
    public Double getAverageRating(Long appId) {
        return reviewRepository.getAverageRatingByAppId(appId);
    }
}