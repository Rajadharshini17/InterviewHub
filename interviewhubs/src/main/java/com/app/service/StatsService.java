package com.app.service;

import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.repository.ExperienceRepository;

@Service
public class StatsService {
 
    @Autowired
    private ExperienceRepository repo;
 
    public long totalExperience(){
        return repo.count();
    }
 
    public long totalCompanies(){
        return repo.findAll()
                .stream()
                .map(e -> e.getCompany())
                .distinct()
                .count();
    }
 
    public String frequentRole(){
        return repo.findAll()
                .stream()
                .collect(Collectors.groupingBy(
                        e -> e.getRole(), Collectors.counting()))
                .entrySet()
                .stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse("N/A");
    }
}
 
