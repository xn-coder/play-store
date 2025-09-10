package com.playstore.owner_service.service;

import com.playstore.owner_service.entity.Owner;
import com.playstore.owner_service.model.OwnerDetails;
import com.playstore.owner_service.repository.OwnerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private OwnerRepository ownerRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Owner owner = ownerRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Owner Not Found with username: " + username));

        return new OwnerDetails(owner);
    }
}
