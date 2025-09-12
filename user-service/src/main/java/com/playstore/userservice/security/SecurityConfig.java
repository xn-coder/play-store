
package com.playstore.userservice.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeRequests(authorizeRequests ->
                authorizeRequests
                    .antMatchers("/h2-console/**").permitAll()
                    .anyRequest().authenticated()
            )
            .csrf(csrf -> csrf
                .ignoringAntMatchers("/h2-console/**")
            )
            .headers(headers ->
                headers
                    .frameOptions(frameOptions -> frameOptions.sameOrigin())
            );
        return http.build();
    }
}
