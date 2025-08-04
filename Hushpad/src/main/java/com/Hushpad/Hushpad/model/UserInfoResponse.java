package com.Hushpad.Hushpad.model;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoResponse {

    private Long id;
    private String username;
    private String email;
    private boolean isAfnan;
    private boolean accountNonLocked;
    private boolean accountNonExpired;
    private boolean enabled;
    private boolean isTwoFactorEnabled;
    private LocalDate CredentialsExpiryDate;
    private LocalDate accoutnExpiredDate;
    private  boolean CredentialsNonExpired;

}
