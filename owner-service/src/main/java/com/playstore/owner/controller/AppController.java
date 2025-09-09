package com.playstore.owner.controller;

import com.playstore.owner.entity.App;
import com.playstore.owner.service.AppService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
}