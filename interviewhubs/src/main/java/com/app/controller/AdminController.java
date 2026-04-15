package com.app.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.app.entity.Admin;
import com.app.entity.InterviewExperience;
import com.app.entity.User;
import com.app.service.AdminService;

import java.util.List;
 
@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {
	
 
    @Autowired
    private AdminService service;
 
    
    @PostMapping("/login")
    public Object login(@RequestBody Admin a){
 
        Admin admin = service.login(a.getUsername(), a.getPassword());
 
        if(admin != null){
            return admin;
        }
 
        return "Invalid Admin Credentials ❌";
    }
 
    //  View all users
    @GetMapping("/users")
    public List<User> getUsers(){
        return service.getAllUsers();
    }
 
    // View all experiences
    @GetMapping("/experiences")
    public List<InterviewExperience> all(){
        return service.allExperiences();
    }
 
    //  View pending
    @GetMapping("/pending")
    public List<InterviewExperience> pending(){
        return service.pending();
    }
 
    // ✅ Approve
    @PutMapping("/approve/{id}")
    public InterviewExperience approve(@PathVariable int id){
        return service.approve(id);
    }
 
    //  Reject
    @PutMapping("/reject/{id}")
    public InterviewExperience reject(@PathVariable int id){
        return service.reject(id);
    }
 
    //  Edit any experience
    @PutMapping("/edit/{id}")
    public InterviewExperience edit(@PathVariable int id,
                                    @RequestBody InterviewExperience e){
        return service.update(id, e);
    }
 
    @DeleteMapping("/delete/{id}")
      public String adminDelete(@PathVariable int id) {
          service.adminDelete(id);
          return "Deleted";
      }

}
 