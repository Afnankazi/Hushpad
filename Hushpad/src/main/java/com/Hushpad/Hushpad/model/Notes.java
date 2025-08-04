package com.Hushpad.Hushpad.model;


import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Notes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @Column(name = "content", columnDefinition = "TEXT")
    private String content;


    private String ownerUsername;
}
