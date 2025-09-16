package com.example.sbrest.service;

import com.example.sbrest.model.User;
import com.example.sbrest.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }
    
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
    public Optional<User> getUserByAzureOid(String azureOid) {
        return userRepository.findByAzureOid(azureOid);
    }
    
    public User createUser(User user) {
        return userRepository.save(user);
    }
    
    public User updateUser(Long id, User userDetails) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        
        user.setName(userDetails.getName());
        user.setEmail(userDetails.getEmail());
        user.setDepartment(userDetails.getDepartment());
        user.setJobTitle(userDetails.getJobTitle());
        
        return userRepository.save(user);
    }
    
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
    
    public User createOrUpdateUserFromAzure(String azureOid, String name, String email) {
        Optional<User> existingUser = userRepository.findByAzureOid(azureOid);
        
        if (existingUser.isPresent()) {
            User user = existingUser.get();
            user.setName(name);
            user.setEmail(email);
            return userRepository.save(user);
        } else {
            User newUser = new User(name, email, azureOid);
            return userRepository.save(newUser);
        }
    }
}
