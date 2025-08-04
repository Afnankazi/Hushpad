package com.Hushpad.Hushpad.Service;

import com.Hushpad.Hushpad.model.Notes;

import java.util.List;

public interface NotesService {

    public Notes createNote(String ownerUsername, Notes note);
    public Notes updateNote(Long id , Notes note);
    public void deleteNote(Long id);
    public List<Notes> findAllNotes(String ownerUsername);
}
