package com.Hushpad.Hushpad.Service;

import com.Hushpad.Hushpad.Repository.RoleRepository;
import com.Hushpad.Hushpad.Repository.UserRepository;
import com.Hushpad.Hushpad.model.AppRoles;
import com.Hushpad.Hushpad.model.Roles;
import com.Hushpad.Hushpad.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminServiceImp  implements AdminService{

    @Autowired
    UserRepository userRepository;
    @Autowired
    RoleRepository roleRepository;

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }
    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }
    @Override
    public void updateUserRole(Long userid, String role) {
        User user = userRepository.findById(userid).orElseThrow(() -> new RuntimeException("User not found"));
        AppRoles appRoles = AppRoles.valueOf(role);
        Roles userrole = roleRepository.findByRoleName(appRoles).orElseThrow(() -> new RuntimeException("Role not found"));
        user.setRole(userrole);
        userRepository.save(user);
    }
}
