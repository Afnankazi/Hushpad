package com.Hushpad.Hushpad.Config.service;

import com.Hushpad.Hushpad.model.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import org.springframework.security.core.GrantedAuthority;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

public class UserDetailsImpl implements UserDetails {

    private static final long serialVersionUID = 1L;

    private Long id;
    private String username;

    @JsonIgnore
    private String password;

    @Email
    private String email;

    private boolean is2factorenabled;

    private boolean isAfnan;

    private Collection<GrantedAuthority> grantedAuthorities;

    public UserDetailsImpl(Long id, String username, String password, String email, boolean is2factorenabled, Collection<GrantedAuthority> grantedAuthorities,  boolean isAfnan) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.is2factorenabled = is2factorenabled;
        this.grantedAuthorities = grantedAuthorities;
        this.isAfnan = isAfnan;
    }

    public static UserDetailsImpl build(User user) {
        GrantedAuthority authority = new SimpleGrantedAuthority(user.getRole().getRoleName().name());

        return new UserDetailsImpl(
                user.getUserid(),
                user.getUsername(),
                user.getPassword(),
                user.getEmail(),
                user.isTwoFactorEnabled(),
                List.of(authority),
                user.isAfnan()

        );
    }

    @Override
    public String getUsername() {
        return this.username;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.grantedAuthorities;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public String getEmail() {
        return email;
    }

    public boolean isTwoFactorEnabled() {
        return is2factorenabled;
    }

}
