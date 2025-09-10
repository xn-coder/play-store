package com.playstore.app.service;

import com.playstore.app.entity.App;
import com.playstore.app.repository.AppRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppService {

    @Autowired
    private AppRepository appRepository;

    public List<App> getAllApps() {
        return appRepository.findAll();
    }
}
