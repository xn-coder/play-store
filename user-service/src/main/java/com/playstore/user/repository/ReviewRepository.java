package com.playstore.user.repository;

import com.playstore.user.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    
    List<Review> findByAppId(Long appId);
    
    List<Review> findByUserId(Long userId);
    
    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.appId = :appId")
    Double getAverageRatingByAppId(@Param("appId") Long appId);
    
    boolean existsByUserIdAndAppId(Long userId, Long appId);
}