package com.playstore.search_service.repository;

import com.playstore.search_service.document.AppDocument;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface AppSearchRepository extends ElasticsearchRepository<AppDocument, String> {
}
