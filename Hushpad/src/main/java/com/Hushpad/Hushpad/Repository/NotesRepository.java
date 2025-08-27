package com.Hushpad.Hushpad.Repository;

import com.Hushpad.Hushpad.model.Notes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NotesRepository extends JpaRepository<Notes, Long> {
    Optional<List<Notes>> findByOwnerUsername(String ownerUsername);
}
