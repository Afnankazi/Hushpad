package com.Hushpad.Hushpad.model;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.Set;

@Setter
@Getter
@AllArgsConstructor
public class SignupRequest {



    @NotBlank
    @Size(min = 6, max = 50)
    private String username;

    @NotBlank
    @Email
    @Size(min = 3, max = 50)
    private String email;

    private String role;

    @NotBlank
    @Size(min = 6, max = 40)
    private String password;

}
