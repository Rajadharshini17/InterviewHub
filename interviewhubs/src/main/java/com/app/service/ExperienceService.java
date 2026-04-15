package com.app.service;
 
import java.util.List;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
 
import com.app.entity.InterviewExperience;
import com.app.entity.User;
import com.app.repository.CommentRepository;
import com.app.repository.ExperienceRepository;
import com.app.repository.UserRepository;
 
import jakarta.transaction.Transactional;
 
@Service
public class ExperienceService {
 
    @Autowired
    private ExperienceRepository repo;
 
    @Autowired
    private CommentRepository commentRepository;
 
    @Autowired
    private UserRepository userRepo;
 
    @Autowired
    private EmailService emailService;
 
    // ✅ ADD EXPERIENCE
    public InterviewExperience add(InterviewExperience e, int userId){
        User user = userRepo.findById(userId).orElse(null);
        e.setUser(user);
        e.setStatus("Pending");
        return repo.save(e);
    }
 
    // ✅ GET ALL
    public List<InterviewExperience> all(){
        return repo.findAll();
    }
 
    // ✅ UPDATE (USER)
    public InterviewExperience update(int id, int userId, InterviewExperience updated){
 
        InterviewExperience e = repo.findById(id).orElse(null);
 
        if(e != null && e.getUser().getUserId() == userId){
            e.setCompany(updated.getCompany());
            e.setRole(updated.getRole());
            e.setExperience(updated.getExperience());
            e.setTechnologies(updated.getTechnologies());
            return repo.save(e);
        }
 
        return null;
    }
 
    // ✅ DELETE (USER)
    public String delete(int id, int userId){
 
        InterviewExperience e = repo.findById(id).orElse(null);
 
        if(e != null && e.getUser().getUserId() == userId){
            repo.deleteById(id);
            return "Deleted";
        }
 
        return "Not Allowed";
    }
 
    // ✅ SEARCH
    public List<InterviewExperience> searchByCompany(String company){
        return repo.findByCompanyContainingIgnoreCase(company);
    }
 
    public List<InterviewExperience> searchByRole(String role){
        return repo.findByRoleContainingIgnoreCase(role);
    }
 
    public List<InterviewExperience> filter(String company, String role){
        return repo.findByCompanyContainingIgnoreCaseAndRoleContainingIgnoreCase(company, role);
    }
 
    // =========================
    // 👍 LIKE (FIXED)
    // =========================
    public InterviewExperience like(int id){
 
        InterviewExperience exp = repo.findById(id).orElse(null);
 
        if(exp != null){
 
           
 
            exp.setLikes(exp.getLikes() + 1);
 
            return repo.save(exp);
        }
 
        return null;
    }
 
    // =========================
    // 👎 DISLIKE (NEW)
    // =========================
    public InterviewExperience dislike(int id){
 
        InterviewExperience exp = repo.findById(id).orElse(null);
 
        if(exp != null){
 
           
 
            exp.setDislikes(exp.getDislikes() + 1);
 
            return repo.save(exp);
        }
 
        return null;
    }
 
    // =========================
    // 🗑 ADMIN DELETE (SAFE)
    // =========================
    @Transactional
    public void adminDelete(int id) {
        commentRepository.deleteByExperienceId(id);
        repo.deleteById(id);
    }
 
    // =========================
    // ✅ APPROVE + EMAIL
    // =========================
    public InterviewExperience approveExperience(int id) {
 
        InterviewExperience exp = repo.findById(id)
            .orElseThrow(() -> new RuntimeException("Experience not found"));
 
        exp.setStatus("Approved");
        repo.save(exp);
 
        if (exp.getUser() != null && exp.getUser().getEmail() != null) {
            emailService.sendEmail(
                exp.getUser().getEmail(),
                "Interview Experience Approved ✅",
                "Hi " + exp.getUser().getFullName() +
                ", your experience for " + exp.getCompany() +
                " has been APPROVED 🎉"
            );
        }
 
        return exp;
    }
 
    // =========================
    // ❌ REJECT + EMAIL
    // =========================
    public InterviewExperience rejectExperience(int id) {
 
        InterviewExperience exp = repo.findById(id)
            .orElseThrow(() -> new RuntimeException("Experience not found"));
 
        exp.setStatus("Rejected");
        repo.save(exp);
 
        if (exp.getUser() != null && exp.getUser().getEmail() != null) {
            emailService.sendEmail(
                exp.getUser().getEmail(),
                "Interview Experience Rejected ❌",
                "Hi " + exp.getUser().getFullName() +
                ", your experience for " + exp.getCompany() +
                " was REJECTED."
            );
        }
 
        return exp;
    }
 
    // =========================
    // ✏ ADMIN UPDATE
    // =========================
    public InterviewExperience adminUpdate(int id, InterviewExperience updated) {
 
        InterviewExperience e = repo.findById(id).orElse(null);
 
        if(e != null){
            e.setCompany(updated.getCompany());
            e.setRole(updated.getRole());
            e.setExperience(updated.getExperience());
            e.setTechnologies(updated.getTechnologies());
            e.setPackageoffer(updated.getPackageoffer());
            e.setLocation(updated.getLocation());
            e.setMode(updated.getMode());
 
            return repo.save(e);
        }
 
        return null;
    }
    
    
    
}
 