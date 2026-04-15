package com.app.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.app.entity.User;
import com.app.service.UserService;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/auth")
public class AuthController {
 
    @Autowired
    private UserService service;
 
    // REGISTER
    @PostMapping("/register")
    public User register(@RequestBody User u) {
        return service.register(u);
    }
 
    // LOGIN (FIXED)
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User u) {
        try {
            User user = service.login(u.getUsername(), u.getPassword());
 
            if (user != null) {
                return ResponseEntity.ok(user);
            } else {
                return ResponseEntity.status(401)
                        .body("Invalid Username or Password ❌");
            }
 
        } catch (Exception e) {
            e.printStackTrace(); // DEBUG
            return ResponseEntity.status(500)
                    .body("Server Error ❌");
        }
    }
 
    // RESET PASSWORD
    @PostMapping("/reset")
    public String reset(@RequestParam String email,
                        @RequestParam String hobby,
                        @RequestParam String newPassword) {
        return service.resetPassword(email, hobby, newPassword);
    }
}
 