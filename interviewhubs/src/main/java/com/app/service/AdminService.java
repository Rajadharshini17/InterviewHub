package com.app.service;


import java.util.List;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
 
import com.app.entity.Admin;
import com.app.entity.InterviewExperience;
import com.app.entity.User;
import com.app.repository.AdminRepository;
import com.app.repository.CommentRepository;
import com.app.repository.ExperienceRepository;
import com.app.repository.UserRepository;

import jakarta.transaction.Transactional;
 
@Service
public class AdminService {

    private final EmailService emailService;
 
    @Autowired
    private ExperienceRepository expRepo;
 
    @Autowired
    private UserRepository userRepo;
 
    @Autowired
    private NotificationService notificationService;
    
    
    @Autowired
    private AdminRepository adminRepo;

    AdminService(EmailService emailService) {
        this.emailService = emailService;
    }
 
    public Admin login(String username, String password) {
    return adminRepo.findByUsernameAndPassword(username, password);
  
}
 
    // All Users
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }
 
    // All Experiences
    public List<InterviewExperience> allExperiences() {
        return expRepo.findAll();
    }
 
    // Pending Experiences
    public List<InterviewExperience> pending() {
        return expRepo.findByStatus("Pending");
    }
 
    public InterviewExperience approve(int id) {
    	 
        InterviewExperience exp = expRepo.findById(id).orElse(null);
     
        if (exp != null) {
     
            exp.setStatus("Approved");
            InterviewExperience saved = expRepo.save(exp);
     
            //  UI Notification
            notificationService.send(
                    exp.getUser(),
                    "Your experience for " + exp.getCompany() + " is APPROVED"
            );
     
            //  EMAIL
            emailService.sendEmail(
                    exp.getUser().getEmail(),
                    "Interview Hub - Experience Approved",
                    "Hi " + exp.getUser().getFullName() +
                    ",\n\nYour interview experience for " + exp.getCompany() +
                    " has been APPROVED and is now visible to all users.\n\nThank you!"
            );
     
            return saved;
        }
     
        return null;
    }
     
 
    // Reject + Notification
    public InterviewExperience reject(int id) {
    	 
        InterviewExperience exp = expRepo.findById(id).orElse(null);
     
        if (exp != null) {
     
            exp.setStatus("Rejected");
            InterviewExperience saved = expRepo.save(exp);
     
            //  UI Notification
            notificationService.send(
                    exp.getUser(),
                    "Your experience for " + exp.getCompany() + " is REJECTED"
            );
     
            // EMAIL
            emailService.sendEmail(
                    exp.getUser().getEmail(),
                    "Interview Hub - Experience Rejected",
                    "Hi " + exp.getUser().getFullName() +
                    ",\n\nYour interview experience for " + exp.getCompany() +
                    " was not approved.\n\nPlease update and resubmit."
            );
     
            return saved;
        }
     
        return null;
    }
     
 
    //  Edit Experience
    public InterviewExperience update(int id, InterviewExperience updated) {
 
        InterviewExperience exp = expRepo.findById(id).orElse(null);
 
        if (exp != null) {
            exp.setCompany(updated.getCompany());
            exp.setRole(updated.getRole());
            exp.setPackageoffer(updated.getPackageoffer());
            exp.setTechnologies(updated.getTechnologies());
            exp.setRounds(updated.getRounds());
            exp.setQuestions(updated.getQuestions());
            exp.setExperience(updated.getExperience());
 
            return expRepo.save(exp);
        }
 
        return null;
    }
 
    //  Delete Experience
    public void delete(int id) {
        expRepo.deleteById(id);
    }

        @Autowired
        private ExperienceRepository repo;

        @Autowired
        private CommentRepository commentRepository;

        // ADMIN DELETE (SAFE & CLEAN)
        @Transactional
        public void adminDelete(int id) {

            // First delete comments of this experience
            commentRepository.deleteByExperienceId(id);

            // Then delete the experience
            repo.deleteById(id);
        }
}
 