package com.app.controller;
 
import com.app.entity.User;
import com.app.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
 
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
 
@WebMvcTest(AuthController.class)
@AutoConfigureMockMvc(addFilters = false)  // ⭐ IMPORTANT (disables security issues)
class AuthControllerTest {
 
    @Autowired
    private MockMvc mockMvc;
 
    @MockBean
    private UserService service;
 
    @Autowired
    private ObjectMapper objectMapper;
 
    // ---------------- REGISTER ----------------
    @Test
    void testRegister() throws Exception {
        User user = new User();
        user.setUserId(1);
        user.setUsername("Raji");
        user.setPassword("1234");
 
        when(service.register(any(User.class))).thenReturn(user);
 
        mockMvc.perform(post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value("Raji"));
    }
 
    // ---------------- LOGIN SUCCESS ----------------
    @Test
    void testLoginSuccess() throws Exception {
        User user = new User();
        user.setUsername("Raji");
        user.setPassword("1234");
 
        User dbUser = new User();
        dbUser.setUserId(1);
        dbUser.setUsername("Raji");
 
        when(service.login("Raji", "1234")).thenReturn(dbUser);
 
        mockMvc.perform(post("/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value("Raji"));
    }
 
    // ---------------- LOGIN FAILURE ----------------
    @Test
    void testLoginFailure() throws Exception {
        User user = new User();
        user.setUsername("wrong");
        user.setPassword("wrong");
 
        when(service.login(anyString(), anyString())).thenReturn(null);
 
        mockMvc.perform(post("/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isUnauthorized())
                .andExpect(content().string("Invalid Username or Password ❌"));
    }
 
    // ---------------- RESET PASSWORD ----------------
    @Test
    void testResetPassword() throws Exception {
 
        when(service.resetPassword("test@gmail.com", "cricket", "new123"))
                .thenReturn("Password updated successfully");
 
        mockMvc.perform(post("/auth/reset")
                .param("email", "test@gmail.com")
                .param("hobby", "cricket")
                .param("newPassword", "new123"))
                .andExpect(status().isOk())
                .andExpect(content().string("Password updated successfully"));
    }
}
 