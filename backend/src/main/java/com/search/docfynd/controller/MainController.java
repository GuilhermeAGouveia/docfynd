package com.search.docfynd.controller;

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
