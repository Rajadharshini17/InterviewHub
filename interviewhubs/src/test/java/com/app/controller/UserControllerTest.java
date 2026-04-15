package com.app.controller;
 
import com.app.entity.User;
import com.app.repository.UserRepository;
import com.app.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
 
import java.util.Arrays;
import java.util.Optional;
 
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
 
@WebMvcTest(UserController.class)
@AutoConfigureMockMvc(addFilters = false) // ⭐ removes Spring Security issues
class UserControllerTest {
 
    @Autowired
    private MockMvc mockMvc;
 
    @MockBean
    private UserRepository repo;
 
    @MockBean
    private UserService userservice;
 
    // ---------------- GET ALL USERS ----------------
    @Test
    void testGetAllUsers() throws Exception {
 
        User user = new User();
        user.setUserId(1);
        user.setFullName("Raji");
 
        when(repo.findAll()).thenReturn(Arrays.asList(user));
 
        mockMvc.perform(get("/user"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].fullName").value("Raji"));
    }
 
    // ---------------- GET USER BY ID ----------------
    @Test
    void testGetUserById() throws Exception {
 
        User user = new User();
        user.setUserId(1);
        user.setFullName("Raji");
 
        when(repo.findById(1)).thenReturn(Optional.of(user));
 
        mockMvc.perform(get("/user/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.fullName").value("Raji"));
    }
 
    // ---------------- UPDATE USER ----------------
    @Test
    void testUpdateUser() throws Exception {
 
        User existing = new User();
        existing.setUserId(1);
        existing.setFullName("Old Name");
 
        User updated = new User();
        updated.setFullName("New Name");
        updated.setEmail("test@gmail.com");
        updated.setPhone("1234567890");
        updated.setQualification("BE");
        updated.setExperienceLevel("Fresher");
        updated.setHobby("Cricket");
 
        when(repo.findById(1)).thenReturn(Optional.of(existing));
        when(repo.save(any(User.class))).thenReturn(existing);
 
        mockMvc.perform(put("/user/1")
                .contentType("application/json")
                .content("""
                        {
                          "fullName":"New Name",
                          "email":"test@gmail.com",
                          "phone":"1234567890",
                          "qualification":"BE",
                          "experienceLevel":"Fresher",
                          "hobby":"Cricket"
                        }
                        """))
                .andExpect(status().isOk());
    }
 
    // ---------------- DELETE USER ----------------
    @Test
    void testDeleteUser() throws Exception {
 
        mockMvc.perform(delete("/user/1"))
                .andExpect(status().isOk());
    }
}
 