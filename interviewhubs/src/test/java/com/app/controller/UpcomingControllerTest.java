package com.app.controller;
 
import com.app.entity.UpcomingInterview;
import com.app.service.UpcomingService;
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
 
@WebMvcTest(UpcomingController.class)
@AutoConfigureMockMvc(addFilters = false)  // ⭐ avoids security issues
class UpcomingControllerTest {
 
    @Autowired
    private MockMvc mockMvc;
 
    @MockBean
    private UpcomingService service;
 
    @Autowired
    private ObjectMapper objectMapper;
 
    // ---------------- GET ALL ----------------
    @Test
    void testGetAll() throws Exception {
 
        UpcomingInterview interview = new UpcomingInterview();
        interview.setId(1);
        interview.setCompany("Google");
 
        when(service.getAll()).thenReturn(Arrays.asList(interview));
 
        mockMvc.perform(get("/interviews"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].company").value("Google"));
    }
 
    // ---------------- ADD ----------------
    @Test
    void testAddInterview() throws Exception {
 
        UpcomingInterview interview = new UpcomingInterview();
        interview.setId(1);
        interview.setCompany("Amazon");
 
        when(service.add(any(UpcomingInterview.class)))
                .thenReturn(interview);
 
        mockMvc.perform(post("/interviews")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(interview)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.company").value("Amazon"));
    }
 
    // ---------------- UPDATE ----------------
    @Test
    void testUpdateInterview() throws Exception {
 
        UpcomingInterview interview = new UpcomingInterview();
        interview.setId(1);
        interview.setCompany("Updated Company");
 
        when(service.update(anyInt(), any(UpcomingInterview.class)))
                .thenReturn(interview);
 
        mockMvc.perform(put("/interviews/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(interview)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.company").value("Updated Company"));
    }
 
    // ---------------- DELETE ----------------
    @Test
    void testDeleteInterview() throws Exception {
 
        mockMvc.perform(delete("/interviews/1"))
                .andExpect(status().isOk());
    }
}
 