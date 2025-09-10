package com.playstore.owner_service.model;

import com.playstore.owner_service.entity.Owner;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class OwnerDetails implements UserDetails {

    private final Owner owner;

    public OwnerDetails(Owner owner) {
        this.owner = owner;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.emptyList();
    }

    @Override
    public String getPassword() {
        return owner.getPassword();
    }

    @Override
    public String getUsername() {
        return owner.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public Owner getOwner() {
        return owner;
    }
}
