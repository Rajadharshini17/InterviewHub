package com.app.controller;
 
import com.app.entity.Comment;
import com.app.service.CommentService;
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
 
@WebMvcTest(CommentController.class)
@AutoConfigureMockMvc(addFilters = false)
class CommentControllerTest {
 
    @Autowired
    private MockMvc mockMvc;
 
    @MockBean
    private CommentService service;
 
    @Autowired
    private ObjectMapper objectMapper;
 
    // ---------------- ADD COMMENT ----------------
    @Test
    void testAddComment() throws Exception {
 
        Comment comment = new Comment();
        comment.setId(1);
        comment.setMessage("Nice experience");  // ✅ FIXED
 
        when(service.addComment(anyInt(), anyInt(), anyString()))
                .thenReturn(comment);
 
        mockMvc.perform(post("/comment/1/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content("\"Nice experience\""))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Nice experience")); // ✅ FIXED
    }
 
    // ---------------- GET COMMENTS ----------------
    @Test
    void testGetComments() throws Exception {
 
        Comment c1 = new Comment();
        c1.setId(1);
        c1.setMessage("Good interview"); // ✅ FIXED
 
        when(service.getComments(1))
                .thenReturn(Arrays.asList(c1));
 
        mockMvc.perform(get("/comment/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].message").value("Good interview")); // ✅ FIXED
    }
}
 