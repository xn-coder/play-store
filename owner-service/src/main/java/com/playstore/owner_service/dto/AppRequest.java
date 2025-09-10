package com.playstore.owner_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AppRequest {
    private String name;
    private String description;
    private String category;
}