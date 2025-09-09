package com.playstore.owner.controller;

import com.playstore.owner.dto.AppRequest;
import com.playstore.owner.entity.App;
import com.playstore.owner.service.AppService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/apps")
@Tag(name = "Applications", description = "App management APIs")
@CrossOrigin(origins = "*")
public class AppController {
    
    @Autowired
    private AppService appService;
    
    @GetMapping
    @Operation(summary = "Get all visible apps")
    public ResponseEntity<List<App>> getAllApps() {
        List<App> apps = appService.getAllVisibleApps();
        return ResponseEntity.ok(apps);
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Get app by ID")
    public ResponseEntity<App> getAppById(@PathVariable Long id) {
        App app = appService.getAppById(id);
        return ResponseEntity.ok(app);
    }
    
    @GetMapping("/search")
    @Operation(summary = "Search apps")
    public ResponseEntity<List<App>> searchApps(@RequestParam String query) {
        List<App> apps = appService.searchApps(query);
        return ResponseEntity.ok(apps);
    }
    
    @GetMapping("/genre/{genre}")
    @Operation(summary = "Get apps by genre")
    public ResponseEntity<List<App>> getAppsByGenre(@PathVariable String genre) {
        List<App> apps = appService.getAppsByGenre(genre);
        return ResponseEntity.ok(apps);
    }
    
    @PostMapping("/{id}/download")
    @Operation(summary = "Increment download count")
    public ResponseEntity<String> downloadApp(@PathVariable Long id) {
        appService.incrementDownloadCount(id);
        return ResponseEntity.ok("Download count updated");
    }
    
    // Owner-specific endpoints
    @GetMapping("/my-apps")
    @PreAuthorize("hasRole(\'OWNER\')")
    @Operation(summary = "Get owner\'s apps")
    public ResponseEntity<List<App>> getMyApps() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Long ownerId = Long.parseLong(auth.getName()); // Assuming username is owner ID
        List<App> apps = appService.getOwnerApps(ownerId);
        return ResponseEntity.ok(apps);
    }
    
    @PostMapping
    @PreAuthorize("hasRole(\'OWNER\')")
    @Operation(summary = "Create new app")
    public ResponseEntity<App> createApp(@Valid @RequestBody AppRequest request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Long ownerId = Long.parseLong(auth.getName());
        App app = appService.createApp(request, ownerId);
        return ResponseEntity.ok(app);
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasRole(\'OWNER\')")
    @Operation(summary = "Update app")
    public ResponseEntity<App> updateApp(@PathVariable Long id, @Valid @RequestBody AppRequest request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Long ownerId = Long.parseLong(auth.getName());
        App app = appService.updateApp(id, request, ownerId);
        return ResponseEntity.ok(app);
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole(\'OWNER\')")
    @Operation(summary = "Delete app")
    public ResponseEntity<String> deleteApp(@PathVariable Long id) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Long ownerId = Long.parseLong(auth.getName());
        appService.deleteApp(id, ownerId);
        return ResponseEntity.ok("App deleted successfully");
    }
}