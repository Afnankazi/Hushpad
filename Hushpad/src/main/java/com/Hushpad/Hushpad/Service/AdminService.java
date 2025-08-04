package com.Hushpad.Hushpad.Service;

import com.Hushpad.Hushpad.model.AppRoles;
import com.Hushpad.Hushpad.model.User;

import java.util.List;

public interface AdminService {

    public List<User> getUsers();
    public User getUserById(Long id);
    public void updateUserRole(Long id , String role);


}
