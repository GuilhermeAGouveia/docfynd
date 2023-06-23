package com.search.docfynd.controller;

import com.elasticsearch.search.api.model.Page;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RestController
@RequestMapping("/app")
public class MainController {
    @GetMapping("/")
    @ResponseStatus(HttpStatus.OK)
    public String getHelloWord() {
        return "Hello Word";
    }
}
