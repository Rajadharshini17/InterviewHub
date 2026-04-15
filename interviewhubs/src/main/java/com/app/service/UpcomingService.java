package com.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.entity.UpcomingInterview;
import com.app.repository.UpcomingRepository;



@Service
public class UpcomingService {
 
    @Autowired
    private UpcomingRepository repo;
 
    // GET ALL
    public List<UpcomingInterview> getAll() {
        return repo.findAll();
    }
 
    // ADD
    public UpcomingInterview add(UpcomingInterview interview) {
        return repo.save(interview);
    }
 
    // DELETE
    public void delete(int id) {
        repo.deleteById(id);
    }
 
    // UPDATE
    public UpcomingInterview update(int id, UpcomingInterview updated) {
 
        UpcomingInterview existing = repo.findById(id).orElse(null);
 
        if (existing != null) {
            existing.setCompany(updated.getCompany());
            existing.setRole(updated.getRole());
            existing.setDate(updated.getDate());
            existing.setLocation(updated.getLocation());
            existing.setMode(updated.getMode());
            existing.setPackageOffer(updated.getPackageOffer());
 
            return repo.save(existing);
        }
 
        return null;
    }
}
 