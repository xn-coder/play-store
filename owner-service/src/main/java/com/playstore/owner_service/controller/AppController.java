package com.playstore.owner_service.controller;

import com.playstore.owner_service.dto.AppRequest;
import com.playstore.owner_service.entity.Application;
import com.playstore.owner_service.service.AppService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/owner/apps")
public class AppController {

    @Autowired
    private AppService appService;

    private Long getOwnerId() {
        // This is a placeholder for a more robust security implementation that would involve parsing a JWT token.
        // In a real application, you would get the owner's ID from the authenticated principal.
        // For now, we'll return a hardcoded value.
        return 1L;
    }

    @PostMapping
    public ResponseEntity<Application> addApp(@RequestBody AppRequest request) {
        return ResponseEntity.ok(appService.addApp(request, getOwnerId()));
    }

    @GetMapping
    public ResponseEntity<List<Application>> getAppsByOwner() {
        return ResponseEntity.ok(appService.getAppsByOwner(getOwnerId()));
    }

    @PutMapping("/{appId}")
    public ResponseEntity<Application> updateApp(@PathVariable Long appId, @RequestBody AppRequest request) {
        return ResponseEntity.ok(appService.updateApp(appId, request, getOwnerId()));
    }

    @DeleteMapping("/{appId}")
    public ResponseEntity<Void> deleteApp(@PathVariable Long appId) {
        appService.deleteApp(appId, getOwnerId());
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{appId}/visibility")
    public ResponseEntity<Application> toggleVisibility(@PathVariable Long appId) {
        return ResponseEntity.ok(appService.toggleVisibility(appId, getOwnerId()));
    }
}
