package com.playstore.owner_service.repository;

import com.playstore.owner_service.entity.App;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppRepository extends JpaRepository<App, Long> {
    
    List<App> findByVisibleTrue();
    
    List<App> findByOwnerId(Long ownerId);
    
    List<App> findByVisibleTrueAndGenre(String genre);
    
    @Query("SELECT a FROM App a WHERE a.visible = true AND (LOWER(a.name) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(a.description) LIKE LOWER(CONCAT('%', :query, '%')))")
    List<App> searchVisibleApps(@Param("query") String query);
    
    @Query("SELECT a FROM App a WHERE a.visible = true ORDER BY a.downloadCount DESC")
    List<App> findVisibleAppsOrderByDownloadCountDesc();
}
