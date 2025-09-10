package com.playstore.app.controller;

import com.playstore.app.entity.App;
import com.playstore.app.service.AppService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/apps")
public class AppController {

    @Autowired
    private AppService appService;

    @GetMapping
    public List<App> getAllApps() {
        return appService.getAllApps();
    }
}
