package com.playstore.user.repository;

import com.playstore.user.entity.AppInstall;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AppInstallRepository extends JpaRepository<AppInstall, Long> {
    List<AppInstall> findByUserId(Long userId);
}
