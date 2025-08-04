package com.Hushpad.Hushpad.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
public class Userinfo {

    private Long id;
    private String username;
    private String email;
    private boolean isAfnan;
    private boolean accountNonLocked;
    private boolean accountNonExpired;
    private boolean enabled;
    private boolean isTwoFactorEnabled;
    private LocalDateTime CredentialsExpiryDate;
    private LocalDateTime accoutnExpiredDate;
    private  boolean CredentialsNonExpired;
    private List<String> roles;
}
