package com.Hushpad.Hushpad.model;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@Setter
@Getter
public class LoginResponse {
    private String username;

    private String jwtToken;

    private List<String> roles;
}
