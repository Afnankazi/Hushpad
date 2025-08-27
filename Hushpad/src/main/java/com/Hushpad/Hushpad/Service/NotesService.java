package com.Hushpad.Hushpad.Service;

import com.Hushpad.Hushpad.model.Notes;
import java.util.List;

public interface NotesService {
    Notes createNote(String ownerUsername, Notes note);
    Notes updateNote(Long id, Notes note);
    void deleteNote(Long id);
    List<Notes> findAllNotes(String ownerUsername);
    void clearNotesCache(String ownerUsername);
}
