package com.app.controller;
 
import java.util.List;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
 
import com.app.entity.UpcomingInterview;
import com.app.service.UpcomingService;
 
@RestController
@CrossOrigin
@RequestMapping("/interviews")
public class UpcomingController {
 
    @Autowired
    private UpcomingService service;
 
    // GET ALL
    @GetMapping
    public List<UpcomingInterview> getAll() {
        return service.getAll();
    }
 
    // ADD
    @PostMapping
    public UpcomingInterview add(@RequestBody UpcomingInterview interview) {
        return service.add(interview);
    }
 
    // UPDATE
    @PutMapping("/{id}")
    public UpcomingInterview update(@PathVariable int id, @RequestBody UpcomingInterview interview) {
        return service.update(id, interview);
    }
 
    // DELETE
    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id) {
        service.delete(id);
    }
}
 