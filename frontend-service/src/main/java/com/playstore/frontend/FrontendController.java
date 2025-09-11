package com.playstore.frontend;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FrontendController {

    @GetMapping("/")
    public String home() {
        return "home";
    }

    @GetMapping("/apps")
    public String apps() {
        return "apps";
    }

    @GetMapping("/games")
    public String games() {
        return "games";
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/register")
    public String register() {
        return "register";
    }

    @GetMapping("/owner-dashboard")
    public String ownerDashboard() {
        return "owner-dashboard";
    }
}
