package com.app.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.service.StatsService;

@RestController
@RequestMapping("/stats")
@CrossOrigin(origins = "http://localhost:5173")
public class StatsController {
 
    @Autowired
    private StatsService service;
 
    @GetMapping
    public Map<String,Object> getStats(){
 
        Map<String,Object> map = new HashMap<>();
 
        map.put("totalExperience", service.totalExperience());
        map.put("totalCompanies", service.totalCompanies());
        map.put("frequentRole", service.frequentRole());
 
        return map;
    }
}
 
