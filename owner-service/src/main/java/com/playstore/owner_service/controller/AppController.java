package com.playstore.owner_service.controller;

import com.playstore.owner_service.dto.AppRequest;
import com.playstore.owner_service.dto.AppResponse;
import com.playstore.owner_service.service.AppService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/apps")
@Tag(name = "App Management", description = "APIs for managing applications")
@CrossOrigin(origins = "*")
public class AppController {
    
    @Autowired
    private AppService appService;
    
    @GetMapping
    @Operation(summary = "Get all visible apps")
    public ResponseEntity<List<AppResponse>> getAllApps() {
        List<AppResponse> apps = appService.getAllVisibleApps();
        return ResponseEntity.ok(apps);
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Get app by ID")
    public ResponseEntity<AppResponse> getAppById(@PathVariable Long id) {
        return appService.getAppById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/search")
    @Operation(summary = "Search apps by name or description")
    public ResponseEntity<List<AppResponse>> searchApps(@RequestParam String query) {
        List<AppResponse> apps = appService.searchApps(query);
        return ResponseEntity.ok(apps);
    }
    
    @GetMapping("/genre/{genre}")
    @Operation(summary = "Get apps by genre")
    public ResponseEntity<List<AppResponse>> getAppsByGenre(@PathVariable String genre) {
        List<AppResponse> apps = appService.getAppsByGenre(genre);
        return ResponseEntity.ok(apps);
    }
    
    @PostMapping("/{id}/download")
    @Operation(summary = "Increment download count for an app")
    public ResponseEntity<AppResponse> downloadApp(@PathVariable Long id) {
        try {
            AppResponse app = appService.incrementDownloadCount(id);
            return ResponseEntity.ok(app);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Authenticated endpoints (for owners)
    @GetMapping("/my-apps")
    @Operation(summary = "Get apps by owner (authenticated)")
    public ResponseEntity<List<AppResponse>> getMyApps(@RequestHeader(value = "X-Owner-Id", required = false) Long ownerId) {
        if (ownerId == null) {
            return ResponseEntity.badRequest().build();
        }
        List<AppResponse> apps = appService.getAppsByOwner(ownerId);
        return ResponseEntity.ok(apps);
    }
    
    @PostMapping
    @Operation(summary = "Create a new app (authenticated)")
    public ResponseEntity<AppResponse> createApp(@Valid @RequestBody AppRequest request, 
                                               @RequestHeader(value = "X-Owner-Id", required = false) Long ownerId) {
        if (ownerId == null) {
            return ResponseEntity.badRequest().build();
        }
        AppResponse app = appService.createApp(request, ownerId);
        return ResponseEntity.ok(app);
    }
    
    @PutMapping("/{id}")
    @Operation(summary = "Update an app (authenticated)")
    public ResponseEntity<AppResponse> updateApp(@PathVariable Long id, 
                                               @Valid @RequestBody AppRequest request,
                                               @RequestHeader(value = "X-Owner-Id", required = false) Long ownerId) {
        if (ownerId == null) {
            return ResponseEntity.badRequest().build();
        }
        try {
            AppResponse app = appService.updateApp(id, request, ownerId);
            return ResponseEntity.ok(app);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete an app (authenticated)")
    public ResponseEntity<Void> deleteApp(@PathVariable Long id,
                                        @RequestHeader(value = "X-Owner-Id", required = false) Long ownerId) {
        if (ownerId == null) {
            return ResponseEntity.badRequest().build();
        }
        try {
            appService.deleteApp(id, ownerId);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}/visibility")
    @Operation(summary = "Toggle app visibility (authenticated)")
    public ResponseEntity<AppResponse> toggleVisibility(@PathVariable Long id,
                                                      @RequestParam boolean visible,
                                                      @RequestHeader(value = "X-Owner-Id", required = false) Long ownerId) {
        if (ownerId == null) {
            return ResponseEntity.badRequest().build();
        }
        try {
            AppResponse app = appService.toggleAppVisibility(id, visible, ownerId);
            return ResponseEntity.ok(app);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}