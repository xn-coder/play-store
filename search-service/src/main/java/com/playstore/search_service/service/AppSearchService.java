package com.playstore.search_service.service;



import com.playstore.search_service.document.AppDocument;
import com.playstore.search_service.repository.AppSearchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AppSearchService {

    @Autowired
    private AppSearchRepository appSearchRepository;

    public void indexApp(AppDocument app) {
        appSearchRepository.save(app);
    }

    public void deleteApp(String id) {
        appSearchRepository.deleteById(id);
    }
}
