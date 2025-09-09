package com.playstore.owner_service;

import com.playstore.owner_service.config.WebSecurityConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Import;

@SpringBootApplication
@EnableFeignClients
@EnableDiscoveryClient
@Import(WebSecurityConfig.class)
public class OwnerServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(OwnerServiceApplication.class, args);
    }
}