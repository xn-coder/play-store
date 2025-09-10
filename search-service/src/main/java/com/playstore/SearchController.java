package com.playstore;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;

@RestController
public class SearchController {

    @GetMapping("/search")
    public List<String> search(@RequestParam String query) {
        // For now, we'll return an empty list.
        // In a real application, we would search for apps in a database or other data source.
        return Collections.emptyList();
    }
}
