package com.Hushpad.Hushpad.Controller;


import com.Hushpad.Hushpad.Service.AdminService;
import com.Hushpad.Hushpad.Service.AdminServiceImp;
import com.Hushpad.Hushpad.model.User;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

        @Autowired
        AdminServiceImp adminServiceimp;


        @GetMapping
        public  ResponseEntity<List<User>> getUsers() {
            return new ResponseEntity<>(adminServiceimp.getUsers(),HttpStatus.OK);
        }

        @PutMapping("/updaterole")
        public ResponseEntity<String> updateUserRole(@RequestParam Long userid, @RequestParam String role) {
            adminServiceimp.updateUserRole(userid, role);
            return new ResponseEntity<>( "User Role Updated  successfully ",HttpStatus.OK);
        }

        @GetMapping("/user/{id}")
        public ResponseEntity<User> getUserById(@PathVariable Long id) {
            return new ResponseEntity<>(adminServiceimp.getUserById(id),HttpStatus.OK);
        }

}
