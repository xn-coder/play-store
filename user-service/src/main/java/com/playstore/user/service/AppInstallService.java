package com.playstore.user.service;

import com.playstore.user.entity.AppInstall;
import com.playstore.user.repository.AppInstallRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AppInstallService {

    @Autowired
    private AppInstallRepository appInstallRepository;

    public AppInstall installApp(Long userId, Long appId) {
        AppInstall appInstall = new AppInstall(userId, appId);
        return appInstallRepository.save(appInstall);
    }

    public List<AppInstall> getInstalledApps(Long userId) {
        return appInstallRepository.findByUserId(userId);
    }
}
