package com.Hushpad.Hushpad.Service;

import com.Hushpad.Hushpad.Repository.NotesRepository;
import com.Hushpad.Hushpad.model.Notes;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteServiceImp implements NotesService{

    @Autowired
    private NotesRepository notesRepository;


    @CacheEvict(value = "notes", key = "#ownerUsername")
    public Notes createNote(String ownerUsername, Notes notes){
        notes.setOwnerUsername(ownerUsername);
        return notesRepository.save(notes);
    }
    @CacheEvict(value = "notes", key = "#note.ownerUsername")
    public Notes updateNote(Long id , Notes note){
        Notes notes = notesRepository.findById(id).orElseThrow(() ->  new RuntimeException("Note not found"));
        notes.setContent(note.getContent());
        return notesRepository.save(notes);
    }
    @CacheEvict(value = "notes", allEntries = true)
    public void deleteNote(Long id){
        notesRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    @Cacheable(value = "notes", key = "#ownerUsername")
    public List<Notes> findAllNotes(String ownerUsername) {
        return notesRepository.findByOwnerUsername(ownerUsername)
                .orElseThrow(() -> new RuntimeException("Notes not found"));
    }

    @CacheEvict(value = "notes", key = "#ownerUsername")
    public void clearNotesCache(String ownerUsername) {
        // This method will clear the cache for the given username
    }
}
