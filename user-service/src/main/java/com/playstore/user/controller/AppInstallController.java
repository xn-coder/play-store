package com.playstore.user.controller;

import com.playstore.user.dto.AppInstallRequest;
import com.playstore.user.entity.AppInstall;
import com.playstore.user.service.AppInstallService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class AppInstallController {

    @Autowired
    private AppInstallService appInstallService;

    @PostMapping("/{userId}/apps")
    public ResponseEntity<AppInstall> installApp(@PathVariable Long userId, @RequestBody AppInstallRequest request) {
        AppInstall installedApp = appInstallService.installApp(userId, request.getAppId());
        return ResponseEntity.ok(installedApp);
    }

    @GetMapping("/{userId}/apps")
    public ResponseEntity<List<AppInstall>> getInstalledApps(@PathVariable Long userId) {
        List<AppInstall> installedApps = appInstallService.getInstalledApps(userId);
        return ResponseEntity.ok(installedApps);
    }
}
