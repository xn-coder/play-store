package com.playstore.userservice.repository;

import com.playstore.userservice.model.Erole;
import com.playstore.userservice.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByName(Erole name);
}
