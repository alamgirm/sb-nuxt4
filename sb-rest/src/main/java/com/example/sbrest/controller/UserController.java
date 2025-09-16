package com.example.sbrest.controller;

import com.example.sbrest.model.User;
import com.example.sbrest.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }
    
    @GetMapping("/me")
    public ResponseEntity<Map<String, Object>> getCurrentUser(@AuthenticationPrincipal Jwt jwt) {
        String azureOid = jwt.getClaimAsString("oid");
        String name = jwt.getClaimAsString("name");
        String email = jwt.getClaimAsString("preferred_username");
        
        // Create or update user in database
        User user = userService.createOrUpdateUserFromAzure(azureOid, name, email);
        
        Map<String, Object> response = Map.of(
            "id", user.getId(),
            "name", user.getName(),
            "email", user.getEmail(),
            "azureOid", user.getAzureOid(),
            "department", user.getDepartment() != null ? user.getDepartment() : "",
            "jobTitle", user.getJobTitle() != null ? user.getJobTitle() : "",
            "createdAt", user.getCreatedAt(),
            "updatedAt", user.getUpdatedAt()
        );
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        Optional<User> user = userService.getUserById(id);
        return user.map(ResponseEntity::ok)
                  .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<User> createUser(@Valid @RequestBody User user) {
        User createdUser = userService.createUser(user);
        return ResponseEntity.ok(createdUser);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @Valid @RequestBody User userDetails) {
        try {
            User updatedUser = userService.updateUser(id, userDetails);
            return ResponseEntity.ok(updatedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/profile")
    public ResponseEntity<Map<String, Object>> getUserProfile(@AuthenticationPrincipal Jwt jwt) {
        String azureOid = jwt.getClaimAsString("oid");
        Optional<User> user = userService.getUserByAzureOid(azureOid);
        
        if (user.isPresent()) {
            User userData = user.get();
            Map<String, Object> response = Map.of(
                "id", userData.getId(),
                "name", userData.getName(),
                "email", userData.getEmail(),
                "azureOid", userData.getAzureOid(),
                "department", userData.getDepartment() != null ? userData.getDepartment() : "",
                "jobTitle", userData.getJobTitle() != null ? userData.getJobTitle() : "",
                "createdAt", userData.getCreatedAt(),
                "updatedAt", userData.getUpdatedAt()
            );
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
