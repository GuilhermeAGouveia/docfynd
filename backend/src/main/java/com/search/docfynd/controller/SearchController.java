package com.search.docfynd.controller;

import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RestController;

import com.elasticsearch.search.api.facade.SearchApi;

@Service
public class SearchController implements SearchApi{

}
