package com.example.apigateway.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {

    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("content", "home");
        return "layout";
    }

    @GetMapping("/home")
    public String home(Model model) {
        model.addAttribute("content", "home");
        return "layout";
    }

    @GetMapping("/apps")
    public String apps(Model model) {
        model.addAttribute("content", "apps");
        return "layout";
    }

    @GetMapping("/games")
    public String games(Model model) {
        model.addAttribute("content", "games");
        return "layout";
    }

    @GetMapping("/login")
    public String login(Model model) {
        model.addAttribute("content", "login");
        return "layout";
    }

    @GetMapping("/register")
    public String register(Model model) {
        model.addAttribute("content", "register");
        return "layout";
    }

    @GetMapping("/owner-dashboard")
    public String ownerDashboard(Model model) {
        model.addAttribute("content", "owner-dashboard");
        return "layout";
    }
}
