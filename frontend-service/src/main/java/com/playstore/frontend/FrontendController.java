package com.playstore.frontend;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class FrontendController {

    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("page", "home");
        model.addAttribute("title", "Home");
        return "layout";
    }

    @GetMapping("/apps")
    public String apps(Model model) {
        model.addAttribute("page", "apps");
        model.addAttribute("title", "Apps");
        return "layout";
    }

    @GetMapping("/games")
    public String games(Model model) {
        model.addAttribute("page", "games");
        model.addAttribute("title", "Games");
        return "layout";
    }

    @GetMapping("/login")
    public String login(Model model) {
        model.addAttribute("page", "login");
        model.addAttribute("title", "Login");
        return "layout";
    }

    @GetMapping("/register")
    public String register(Model model) {
        model.addAttribute("page", "register");
        model.addAttribute("title", "Register");
        return "layout";
    }

    @GetMapping("/owner-dashboard")
    public String ownerDashboard(Model model) {
        model.addAttribute("page", "owner-dashboard");
        model.addAttribute("title", "Owner Dashboard");
        return "layout";
    }

    @GetMapping("/installed")
    public String installed(Model model) {
        model.addAttribute("page", "installed");
        model.addAttribute("title", "Installed");
        return "layout";
    }

    @GetMapping("/search")
    public String search(@RequestParam("q") String query, Model model) {
        model.addAttribute("page", "search");
        model.addAttribute("title", "Search Results");
        model.addAttribute("query", query);
        return "layout";
    }
}