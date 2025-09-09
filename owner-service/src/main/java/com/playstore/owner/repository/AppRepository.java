package com.playstore.owner.repository;

import com.playstore.owner.entity.App;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AppRepository extends JpaRepository<App, Long> {
    
    List<App> findByOwnerId(Long ownerId);
    
    List<App> findByIsVisibleTrue();
    
    List<App> findByGenreAndIsVisibleTrue(String genre);
    
    @Query("SELECT a FROM App a WHERE a.isVisible = true AND " +
           "(LOWER(a.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(a.description) LIKE LOWER(CONCAT('%', :searchTerm, '%')))")
    List<App> searchVisibleApps(@Param("searchTerm") String searchTerm);
    
    @Query("SELECT a FROM App a WHERE a.isVisible = true ORDER BY a.downloadCount DESC")
    List<App> findTopDownloadedApps();
}