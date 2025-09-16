package com.example.sbrest.controller;

import com.example.sbrest.model.User;
import com.example.sbrest.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
public class AdminController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getAdminStats(@AuthenticationPrincipal Jwt jwt) {
        // Get user info from JWT
        String name = jwt.getClaimAsString("name");
        String email = jwt.getClaimAsString("preferred_username");
        
        // Get total user count
        List<User> allUsers = userService.getAllUsers();
        
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", allUsers.size());
        stats.put("adminUser", name);
        stats.put("adminEmail", email);
        stats.put("message", "Welcome to the admin panel!");
        
        return ResponseEntity.ok(stats);
    }
    
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsersForAdmin() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }
    
    @GetMapping("/system-info")
    public ResponseEntity<Map<String, Object>> getSystemInfo(@AuthenticationPrincipal Jwt jwt) {
        Map<String, Object> systemInfo = new HashMap<>();
        systemInfo.put("service", "Spring Boot REST API");
        systemInfo.put("version", "1.0.0");
        systemInfo.put("javaVersion", System.getProperty("java.version"));
        systemInfo.put("springVersion", org.springframework.core.SpringVersion.getVersion());
        systemInfo.put("authenticatedUser", jwt.getClaimAsString("name"));
        systemInfo.put("userRoles", jwt.getClaimAsStringList("roles"));
        
        return ResponseEntity.ok(systemInfo);
    }
}
