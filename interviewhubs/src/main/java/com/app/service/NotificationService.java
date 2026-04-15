package com.app.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.entity.Notification;
import com.app.entity.User;
import com.app.repository.NotificationRepository;

import java.util.List;
 



 
@Service
public class NotificationService {
 
    @Autowired
    private NotificationRepository repo;
 
    // 🔔 send notification
    public void send(User user, String message) {
 
        Notification n = new Notification();
        n.setUser(user);
        n.setMessage(message);
        n.setStatus("UNREAD");
 
        repo.save(n);
    }
 
    // 📥 get notifications
    public List<Notification> get(int userId) {
        return repo.findByUserUserId(userId);
    }
}
 
