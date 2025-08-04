package com.Hushpad.Hushpad.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.HashSet;
import java.util.Set;


@Entity
@Getter
@Setter
@NoArgsConstructor

@Table(name = "Roles")
public class Roles {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "role_id")
    private Long id;

    @Enumerated(EnumType.STRING)
    private AppRoles roleName;

    @OneToMany( mappedBy = "role" , fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    @ToString.Exclude
    @JsonManagedReference
    private Set<User> users = new HashSet<>();

    public Roles(AppRoles roleName) {
        this.roleName = roleName;
    }

}
