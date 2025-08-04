package com.Hushpad.Hushpad.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.validator.constraints.UniqueElements;

import java.time.LocalDate;
import java.time.LocalDateTime;


@Entity
@NoArgsConstructor
@Getter
@Setter
@Table(name = "Users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userid;

    @NotBlank
    @Column(unique = true)
    private String username;

    @NotBlank
    @JsonIgnore
    private String password;

    @NotBlank
    @Email
    @Column(unique = true)
    private String email;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.EAGER ,  cascade = CascadeType.MERGE)
    @JoinColumn(name = "Roles" , referencedColumnName = "role_id")
    @ToString.Exclude
    private Roles role;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime created;

    @UpdateTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime updated;

    private boolean isAfnan = false;
    private boolean accountNonLocked= true;
    private boolean accountNonExpired= true;
    private boolean enabled= true;
    private boolean isTwoFactorEnabled= false;
    private String twoFactorSecrate;
    private String signupMethod;
    private  boolean CredentialsNonExpired;

    private LocalDateTime CredentialsExpiryDate;
    private LocalDateTime accoutnExpiredDate;

    public User(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }

    @Override
    public boolean equals(Object o){
        if (this == o) return true;
        if(!(o instanceof User)) return false;
        return userid.equals(((User)o).userid);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }



}
