package com.app.controller;
 
import com.app.entity.Admin;
import com.app.entity.InterviewExperience;
import com.app.entity.User;
import com.app.service.AdminService;
import com.app.service.EmailService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
 
import java.util.Arrays;
 
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
 
@WebMvcTest(AdminController.class)
@AutoConfigureMockMvc(addFilters = false)   // ⭐ IMPORTANT (Fixes 401/403)
class AdminControllerTest {
 
    @Autowired
    private MockMvc mockMvc;
 
    @MockBean
    private AdminService service;
 
    @MockBean
    private EmailService emailService;
 
    @Autowired
    private ObjectMapper objectMapper;
 
    // ---------------- LOGIN SUCCESS ----------------
    @Test
    void testLoginSuccess() throws Exception {
        Admin admin = new Admin();
        admin.setUsername("admin");
        admin.setPassword("1234");
 
        when(service.login("admin", "1234")).thenReturn(admin);
 
        mockMvc.perform(post("/admin/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(admin)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value("admin"));
    }
 
    // ---------------- LOGIN FAIL ----------------
    @Test
    void testLoginFailure() throws Exception {
        Admin admin = new Admin();
        admin.setUsername("wrong");
        admin.setPassword("wrong");
 
        when(service.login(any(), any())).thenReturn(null);
 
        mockMvc.perform(post("/admin/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(admin)))
                .andExpect(status().isOk())
                .andExpect(content().string("Invalid Admin Credentials ❌"));
    }
 
    // ---------------- GET USERS ----------------
    @Test
    void testGetUsers() throws Exception {
        User user = new User();
        user.setUserId(1);
        user.setUsername("Raji");
 
        when(service.getAllUsers()).thenReturn(Arrays.asList(user));
 
        mockMvc.perform(get("/admin/users"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].username").value("Raji"));
    }
 
    // ---------------- GET EXPERIENCES ----------------
    @Test
    void testAllExperiences() throws Exception {
        InterviewExperience exp = new InterviewExperience();
        exp.setId(1);
        exp.setCompany("Google");
 
        when(service.allExperiences()).thenReturn(Arrays.asList(exp));
 
        mockMvc.perform(get("/admin/experiences"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].company").value("Google"));
    }
 
    // ---------------- PENDING ----------------
    @Test
    void testPending() throws Exception {
        InterviewExperience exp = new InterviewExperience();
        exp.setId(1);
        exp.setStatus("pending");
 
        when(service.pending()).thenReturn(Arrays.asList(exp));
 
        mockMvc.perform(get("/admin/pending"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].status").value("pending"));
    }
 
    // ---------------- APPROVE ----------------
    @Test
    void testApprove() throws Exception {
        InterviewExperience exp = new InterviewExperience();
        exp.setId(1);
        exp.setStatus("approved");
 
        when(service.approve(1)).thenReturn(exp);
 
        mockMvc.perform(put("/admin/approve/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("approved"));
    }
 
    // ---------------- REJECT ----------------
    @Test
    void testReject() throws Exception {
        InterviewExperience exp = new InterviewExperience();
        exp.setId(1);
        exp.setStatus("rejected");
 
        when(service.reject(1)).thenReturn(exp);
 
        mockMvc.perform(put("/admin/reject/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("rejected"));
    }
 
    // ---------------- EDIT ----------------
    @Test
    void testEdit() throws Exception {
        InterviewExperience exp = new InterviewExperience();
        exp.setId(1);
        exp.setCompany("Updated Company");
        exp.setStatus("pending");
 
        when(service.update(anyInt(), any())).thenReturn(exp);
 
        mockMvc.perform(put("/admin/edit/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(exp)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.company").value("Updated Company"));
    }
 
    // ---------------- DELETE ----------------
    @Test
    void testDelete() throws Exception {
        mockMvc.perform(delete("/admin/delete/1"))
                .andExpect(status().isOk())
                .andExpect(content().string("Deleted"));
    }
}
 