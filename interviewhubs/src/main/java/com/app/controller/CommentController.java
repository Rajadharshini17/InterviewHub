package com.app.controller;
 
import java.util.List;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import com.app.entity.Comment;
import com.app.service.CommentService;
 
@RestController
@RequestMapping("/comment")
@CrossOrigin(origins = "http://localhost:5173")
public class CommentController {
 
    @Autowired
    private CommentService service;
 
    // ✅ ADD COMMENT
    @PostMapping("/{expId}/{userId}")
    public Comment addComment(
            @PathVariable int expId,
            @PathVariable int userId,
            @RequestBody String text) {
 
        return service.addComment(expId, userId, text);
    }
 
    // ✅ GET COMMENTS
    @GetMapping("/{expId}")
    public List<Comment> getComments(@PathVariable int expId) {
        return service.getComments(expId);
    }
}
    
  


 