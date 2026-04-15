package com.app.controller;
 
import java.util.List;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
 
import com.app.entity.Comment;
import com.app.entity.InterviewExperience;
import com.app.service.CommentService;
import com.app.service.ExperienceService;
 
@RestController
@RequestMapping("/experience")
@CrossOrigin(origins = "http://localhost:5173")
public class ExperienceController {
 
    @Autowired
    private ExperienceService service;
 
    @Autowired
    private CommentService commentService;
 
    // =========================
    // ✅ GET ALL
    // =========================
    @GetMapping
    public List<InterviewExperience> all() {
        return service.all();
    }
 
    // =========================
    // ✅ ADD EXPERIENCE
    // =========================
    @PostMapping("/{userId}")
    public InterviewExperience add(
            @RequestBody InterviewExperience exp,
            @PathVariable int userId) {
 
        return service.add(exp, userId);
    }
 
    // =========================
    // ✅ UPDATE (USER)
    // =========================
    @PutMapping("/{id}/{userId}")
    public InterviewExperience update(
            @PathVariable int id,
            @PathVariable int userId,
            @RequestBody InterviewExperience exp) {
 
        return service.update(id, userId, exp);
    }
 
//     =========================
//     ✅ DELETE (USER)
//     =========================
    @DeleteMapping("/{id}/{userId}")
    public String delete(
            @PathVariable int id,
            @PathVariable int userId) {
 
        return service.delete(id, userId);
    }
 
    // =========================
    // 👍 LIKE
    // =========================
    @PostMapping("/{id}/like")
    public InterviewExperience like(@PathVariable int id) {
        return service.like(id);
    }
 
    // =========================
    // 👎 DISLIKE
    // =========================
    @PostMapping("/{id}/dislike")
    public InterviewExperience dislike(@PathVariable int id) {
        return service.dislike(id);
    }
    
    
 // 💬 ADD COMMENT
    @PostMapping("/{expId}/comment/{userId}")
    public Comment addComment(
            @PathVariable int expId,
            @PathVariable int userId,
            @RequestBody String comment) {

        return commentService.addComment(expId, userId, comment);
    }

    // 💬 GET COMMENTS
    @GetMapping("/{expId}/comments")
    public List<Comment> getComments(@PathVariable int expId) {
        return commentService.getComments(expId);
    }
    

@PostMapping("/reply/{commentId}/{userId}")
public Comment reply(
        @PathVariable int commentId,
        @PathVariable int userId,
        @RequestBody String text) {

    return commentService.addReply(commentId, userId, text);
}

}

   
     
    

 