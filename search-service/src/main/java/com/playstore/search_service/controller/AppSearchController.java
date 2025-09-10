package com.playstore.search_service.controller;

import com.playstore.search_service.document.AppDocument;
import com.playstore.search_service.service.AppSearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/search")
public class AppSearchController {

    @Autowired
    private AppSearchService appSearchService;

    @PostMapping("/index")
    public void indexApp(@RequestBody AppDocument app) {
        appSearchService.indexApp(app);
    }

    @DeleteMapping("/{id}")
    public void deleteApp(@PathVariable String id) {
        appSearchService.deleteApp(id);
    }
}
