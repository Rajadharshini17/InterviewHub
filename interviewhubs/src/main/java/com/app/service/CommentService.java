package com.app.service;
 
import java.util.List;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.app.entity.Comment;
import com.app.entity.InterviewExperience;
import com.app.entity.User;
import com.app.repository.CommentRepository;
import com.app.repository.ExperienceRepository;
import com.app.repository.UserRepository;
 
@Service
public class CommentService {
 
    @Autowired
    private CommentRepository commentRepo;
 
    @Autowired
    private ExperienceRepository expRepo;
 
    @Autowired
    private UserRepository userRepo;
 
    // ✅ ADD COMMENT
    public Comment addComment(int expId, int userId, String text) {
 
        InterviewExperience exp = expRepo.findById(expId).orElse(null);
        User user = userRepo.findById(userId).orElse(null);
 
        if (exp == null || user == null) return null;
 
        Comment c = new Comment();
        c.setMessage(text);
        c.setExperience(exp);
        c.setUser(user);
 
        return commentRepo.save(c);
    }
	public List<Comment> getComments(int expId) {
		
		return commentRepo.findByExperienceId(expId);
	}

	public Comment addReply(int parentId, int userId, String text){
		 
	    Comment parent = commentRepo.findById(parentId).orElse(null);
	    User user = userRepo.findById(userId).orElse(null);
	 
	    if(parent == null || user == null) return null;
	 
	    Comment reply = new Comment();
	    reply.setMessage(text);
	    reply.setUser(user);
	    reply.setExperience(parent.getExperience()); // same experience
	    reply.setParent(parent); // 🔥 link to parent
	 
	    return commentRepo.save(reply);
	}
	 


	
     
}
 