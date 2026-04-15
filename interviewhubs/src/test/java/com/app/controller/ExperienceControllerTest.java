package com.app.controller;
 
import com.app.entity.Comment;
import com.app.entity.InterviewExperience;
import com.app.service.CommentService;
import com.app.service.ExperienceService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import java.util.Arrays;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
 
@WebMvcTest(ExperienceController.class)
@AutoConfigureMockMvc(addFilters = false) // ⭐ removes security issues
class ExperienceControllerTest {
 
    @Autowired
    private MockMvc mockMvc;
 
    @MockBean
    private ExperienceService service;
 
    @MockBean
    private CommentService commentService;
 
    @Autowired
    private ObjectMapper objectMapper;
 
    // ---------------- GET ALL ----------------
    @Test
    void testGetAllExperiences() throws Exception {
 
        InterviewExperience exp = new InterviewExperience();
        exp.setId(1);
        exp.setCompany("Google");
 
        when(service.all()).thenReturn(Arrays.asList(exp));
 
        mockMvc.perform(get("/experience"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].company").value("Google"));
    }
 
    // ---------------- ADD EXPERIENCE ----------------
    @Test
    void testAddExperience() throws Exception {
 
        InterviewExperience exp = new InterviewExperience();
        exp.setId(1);
        exp.setCompany("Amazon");
 
        when(service.add(any(InterviewExperience.class), anyInt()))
                .thenReturn(exp);
 
        mockMvc.perform(post("/experience/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(exp)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.company").value("Amazon"));
    }
 
    // ---------------- UPDATE EXPERIENCE ----------------
    @Test
    void testUpdateExperience() throws Exception {
 
        InterviewExperience exp = new InterviewExperience();
        exp.setId(1);
        exp.setCompany("Updated Company");
 
        when(service.update(anyInt(), anyInt(), any(InterviewExperience.class)))
                .thenReturn(exp);
 
        mockMvc.perform(put("/experience/1/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(exp)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.company").value("Updated Company"));
    }
 
    // ---------------- DELETE EXPERIENCE ----------------
    @Test
    void testDeleteExperience() throws Exception {
 
        when(service.delete(1, 1)).thenReturn("Deleted successfully");
 
        mockMvc.perform(delete("/experience/1/1"))
                .andExpect(status().isOk())
                .andExpect(content().string("Deleted successfully"));
    }
 
    // ---------------- LIKE ----------------
    @Test
    void testLikeExperience() throws Exception {
 
        InterviewExperience exp = new InterviewExperience();
        exp.setId(1);
        exp.setLikes(1);
 
        when(service.like(1)).thenReturn(exp);
 
        mockMvc.perform(post("/experience/1/like"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.likes").value(1));
    }
 
    // ---------------- DISLIKE ----------------
    @Test
    void testDislikeExperience() throws Exception {
 
        InterviewExperience exp = new InterviewExperience();
        exp.setId(1);
        exp.setDislikes(1);
 
        when(service.dislike(1)).thenReturn(exp);
 
        mockMvc.perform(post("/experience/1/dislike"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.dislikes").value(1));
    }
 
    // ADD COMMENT 
    @Test
    void testAddComment() throws Exception {
 
        Comment comment = new Comment();
        comment.setId(1);
        comment.setMessage("Nice experience");
 
        when(commentService.addComment(anyInt(), anyInt(), anyString()))
                .thenReturn(comment);
 
        mockMvc.perform(post("/experience/1/comment/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content("\"Nice experience\""))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Nice experience"));
    }
 
    // GET COMMENTS
    @Test
    void testGetComments() throws Exception {
 
        Comment c1 = new Comment();
        c1.setId(1);
        c1.setMessage("Good interview");
 
        when(commentService.getComments(1))
                .thenReturn(Arrays.asList(c1));
 
        mockMvc.perform(get("/experience/1/comments"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].message").value("Good interview"));
    }
 
    // REPLY COMMENT
    @Test
    void testReplyComment() throws Exception {
 
        Comment reply = new Comment();
        reply.setId(2);
        reply.setMessage("Thanks!");
 
        when(commentService.addReply(anyInt(), anyInt(), anyString()))
                .thenReturn(reply);
 
        mockMvc.perform(post("/experience/reply/1/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content("\"Thanks!\""))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Thanks!"));
    }
}
 