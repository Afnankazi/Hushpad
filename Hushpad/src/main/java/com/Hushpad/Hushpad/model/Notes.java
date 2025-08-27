package com.Hushpad.Hushpad.model;


import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "notes", indexes = {
    @Index(name = "idx_notes_ownerusername", columnList = "ownerUsername")
})
public class Notes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "content", columnDefinition = "TEXT")
    private String content;


    private String ownerUsername;
}
