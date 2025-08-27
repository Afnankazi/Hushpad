package com.Hushpad.Hushpad.Controller;


import com.Hushpad.Hushpad.Config.jwt.JwtUtils;
import com.Hushpad.Hushpad.Config.service.UserServiceImp;
import com.Hushpad.Hushpad.Repository.RoleRepository;
import com.Hushpad.Hushpad.Repository.UserRepository;
import com.Hushpad.Hushpad.model.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


import java.time.LocalDateTime;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    UserServiceImp userService;

    @GetMapping("/info")
    public ResponseEntity<?> getUserInfo(@AuthenticationPrincipal UserDetails userDetails) {
       User user = userService.findByUsername(userDetails.getUsername());
        List<String> role =  userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList();
        Userinfo userinfo = new Userinfo(user.getUserid(),user.getUsername(),user.getEmail(),user.isAfnan() , user.isAccountNonLocked(),user.isAccountNonExpired(),user.isEnabled(),user.isTwoFactorEnabled(),user.getCredentialsExpiryDate(), user.getAccoutnExpiredDate() , user.isCredentialsNonExpired() , role);
        return  ResponseEntity.ok().body(userinfo);

    }
    @GetMapping("/username")
    public ResponseEntity<?> getUsername(@AuthenticationPrincipal UserDetails userDetails) {
        HashMap<String , String> map = new HashMap<>();
        String usernameValue = (userDetails != null) ? userDetails.getUsername() : "";
        map.put("username", usernameValue);
        return  ResponseEntity.ok().body(map);
    }


    @PostMapping("/public/signin")
    public ResponseEntity<?> signin(@RequestBody LoginRequest loginRequest) {
        Authentication authentication;
        try {
            System.out.println("Hit");
            authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
            System.out.println("Auth is "+ authentication.getPrincipal());
        }catch (AuthenticationException ex){
            Map<String,String> map = new HashMap<>();
            map.put("TimeStamp",LocalDateTime.now().toString());
            map.put("message",ex.getMessage());
            map.put("Statusscode","401");
            return new ResponseEntity<>(map,HttpStatus.UNAUTHORIZED);
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String jwt  = jwtUtils.generateTokenFromUsername(userDetails);
        List<String> roles = userDetails.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        LoginResponse response =  new LoginResponse(userDetails.getUsername(), jwt,roles);
        return ResponseEntity.ok(response);
    }


   @PostMapping("/public/signup")
   public ResponseEntity<?> signup (@Valid @RequestBody SignupRequest signup , HttpServletRequest request) {
       System.out.println("signup");
        if(userRepository.existsByUsername(signup.getUsername())){
            return ResponseEntity.badRequest().body(new MessageResponse("Username is already taken!"));
        }
        if(userRepository.existsByEmail(signup.getEmail())){
            return ResponseEntity.badRequest().body(new MessageResponse("Email is already in use!"));
        }
        String role = signup.getRole().toLowerCase();
        AppRoles approle;
       User user = new User(signup.getUsername() , passwordEncoder.encode(signup.getPassword()), signup.getEmail());
       if(role.equals("user")){approle = AppRoles.ROLE_USER;
       } else if (role.equals("afnan")) {
           if(extractClientIp(request).equals("192.168.0.7") || extractClientIp(request).equals("0:0:0:0:0:0:0:1")) {
               System.out.println(extractClientIp(request));
               user.setAfnan(true);
               approle = AppRoles.ROLE_AFNAN;
           }else{
               return ResponseEntity.badRequest().body(new MessageResponse("only afnan can be afnan"));
           }

       } else if (role.equals("admin")) {
           approle = AppRoles.ROLE_ADMIN;

       }else{
           return ResponseEntity.badRequest().body(new MessageResponse("invalid role"));
       }
       user.setRole(roleRepository.findByRoleName(approle).orElseThrow(()->new RuntimeException("Role not found!")));
       user.setAccountNonExpired(true);
        user.setAccountNonLocked(true);
        user.setCredentialsNonExpired(true);
        user.setEnabled(true);
        user.setCredentialsExpiryDate(LocalDateTime.now().plusYears(1));
        user.setAccoutnExpiredDate(LocalDateTime.now().plusYears(1));
        user.setSignupMethod("email");
        userRepository.save(user);
        return ResponseEntity.ok(new MessageResponse("Account created successfully!"));

   }
  private String extractClientIp(HttpServletRequest request) {
    String xfHeader = request.getHeader("X-Forwarded-For");
    if (xfHeader != null) {
        return xfHeader.split(",")[0];
    }
    return request.getRemoteAddr();
}

}


 


