package com.playstore.owner_service.repository;

import com.playstore.owner_service.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppRepository extends JpaRepository<Application, Long> {
    List<Application> findByOwnerId(Long ownerId);
}
