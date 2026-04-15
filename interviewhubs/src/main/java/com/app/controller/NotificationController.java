package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.entity.Notification;
import com.app.service.NotificationService;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/notify")
public class NotificationController {
 
    @Autowired
    private NotificationService service;
 
    @GetMapping("/{userId}")
    public List<Notification> get(@PathVariable int userId){
        return service.get(userId);
    }
}
