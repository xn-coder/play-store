package com.playstore.apigateway.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import reactor.core.publisher.Mono;

@Controller
public class ViewController {

    @GetMapping("/")
    public Mono<String> index() {
        return Mono.just("index");
    }
    
}
