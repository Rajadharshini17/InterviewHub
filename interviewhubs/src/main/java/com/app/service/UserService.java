package com.app.service;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
 
import com.app.entity.User;
import com.app.repository.ExperienceRepository;
import com.app.repository.NotificationRepository;
import com.app.repository.UserRepository;

import jakarta.transaction.Transactional;
 
@Service
public class UserService {
 
    @Autowired
    private UserRepository repo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private NotificationRepository notificationRepo;

    @Autowired
    private ExperienceRepository experienceRepo;

 
    // REGISTER
    public User register(User u) {
        return repo.save(u);
    }
 
    // LOGIN (NO 500 ERROR)
    public User login(String username, String password) {
 
        User user = repo.findByUsername(username);
 
        // IMPORTANT NULL CHECK
        if (user != null && user.getPassword().equals(password)) {
            return user;
        }
 
        return null;
    }
 
    //  RESET PASSWORD
    public String resetPassword(String email, String hobby, String newPassword) {
 
        User user = repo.findByEmail(email);
 
        if (user != null && user.getHobby().equalsIgnoreCase(hobby)) {
            user.setPassword(newPassword);
            repo.save(user);
            return "Password Updated ✅";
        }
 
        return "Invalid Details ❌";
    }
 
    @Transactional
       public void deleteUser(int id) {

           // safety check (optional)
           User user = userRepo.findById(id).orElse(null);
           if (user == null) return;

           // IF experiences linked to user → remove them first
           experienceRepo.deleteByUser_UserId(id);

           userRepo.deleteById(id);
       }
}

 