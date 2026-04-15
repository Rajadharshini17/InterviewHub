package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.app.entity.User;
import com.app.repository.UserRepository;
import com.app.service.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserRepository repo;

    @Autowired
    private UserService userservice;
    // GET ALL USERS (ADMIN DASHBOARD NEEDS THIS)
    @GetMapping
    public List<User> getAllUsers() {
        return repo.findAll();
    }

    // GET USER BY ID
    @GetMapping("/{id}")
    public User getUser(@PathVariable int id) {
        return repo.findById(id).orElse(null);
    }

    // UPDATE USER PROFILE
    @PutMapping("/{id}")
    public User updateUser(@PathVariable int id, @RequestBody User updatedUser) {

        User user = repo.findById(id).orElse(null);

        if (user != null) {
            user.setFullName(updatedUser.getFullName());
            user.setEmail(updatedUser.getEmail());
            user.setPhone(updatedUser.getPhone());
            user.setQualification(updatedUser.getQualification());
            user.setExperienceLevel(updatedUser.getExperienceLevel());
            user.setHobby(updatedUser.getHobby());
            return repo.save(user);
        }

        return null;
    }
    

    @DeleteMapping("/{id}")
       public void deleteUser(@PathVariable int id) {
    	userservice.deleteUser(id);
       }

}

    
