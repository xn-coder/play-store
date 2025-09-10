package com.playstore.userservice.repository;

import com.playstore.userservice.model.Erole;
import com.playstore.userservice.model.Role;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RoleRepository extends MongoRepository<Role, String> {
    Optional<Role> findByName(Erole name);
}
