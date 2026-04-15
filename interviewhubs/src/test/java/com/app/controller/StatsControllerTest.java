package com.app.controller;
 
import com.app.service.StatsService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
 
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
 
@WebMvcTest(StatsController.class)
@AutoConfigureMockMvc(addFilters = false) // ⭐ avoids Spring Security issues
class StatsControllerTest {
 
    @Autowired
    private MockMvc mockMvc;
 
    @MockBean
    private StatsService service;
 
    // ---------------- GET STATS ----------------
    @Test
    void testGetStats() throws Exception {
 
        when(service.totalExperience()).thenReturn(10L);
        when(service.totalCompanies()).thenReturn(5L);
        when(service.frequentRole()).thenReturn("Software Engineer");
 
        mockMvc.perform(get("/stats"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalExperience").value(10))
                .andExpect(jsonPath("$.totalCompanies").value(5))
                .andExpect(jsonPath("$.frequentRole").value("Software Engineer"));
    }
}
 