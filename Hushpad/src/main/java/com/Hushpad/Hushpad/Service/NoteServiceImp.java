package com.Hushpad.Hushpad.Service;

import com.Hushpad.Hushpad.Repository.NotesRepository;
import com.Hushpad.Hushpad.model.Notes;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteServiceImp implements NotesService{

    @Autowired
    private NotesRepository notesRepository;


    public Notes createNote(String ownerUsername, Notes notes){
        notes.setOwnerUsername(ownerUsername);
        return notesRepository.save(notes);
    }
    public Notes updateNote(Long id , Notes note){
        System.out.println(note.getOwnerUsername());
        Notes notes = notesRepository.findById(id).orElseThrow(() ->  new RuntimeException("Note not found"));
        notes.setContent(note.getContent());
        System.out.println(notes);
        return notesRepository.save(notes);
    }
    public void deleteNote(Long id){
        notesRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public List<Notes> findAllNotes(String ownerUsername){
        return notesRepository.findByOwnerUsername(ownerUsername).orElseThrow(() ->  new RuntimeException("Note not found"));
    }
}
