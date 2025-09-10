package com.playstore.owner_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OwnerRegistrationRequest {
    private String username;
    private String password;
    private String email;
}