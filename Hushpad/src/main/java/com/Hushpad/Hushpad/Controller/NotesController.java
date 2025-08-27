package com.Hushpad.Hushpad.Controller;


import com.Hushpad.Hushpad.Service.NoteServiceImp;
import com.Hushpad.Hushpad.model.Notes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
public class NotesController {

    @Autowired
    private NoteServiceImp noteService;

    @PostMapping
    public ResponseEntity<Notes> CreateNote(@RequestBody Notes note , @AuthenticationPrincipal UserDetails userDetails) {
        return new ResponseEntity<>(noteService.createNote(userDetails.getUsername(),note), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Notes>> getAllNotes(@AuthenticationPrincipal UserDetails userDetails) {
        return new ResponseEntity<>(noteService.findAllNotes(userDetails.getUsername()), HttpStatus.OK);
    }

    @PutMapping("/{noteId}")
    public  ResponseEntity<Notes> UpdateNote(@PathVariable Long noteId ,@RequestBody Notes notes , @AuthenticationPrincipal UserDetails userDetails) {
        System.out.println(notes.getContent());
        return  new ResponseEntity<>(noteService.updateNote(noteId, notes), HttpStatus.OK);
    }

    @DeleteMapping("/{noteId}")
    public ResponseEntity<HttpStatus> DeleteNote(@PathVariable Long noteId){
        noteService.deleteNote(noteId) ;
        return  new ResponseEntity(HttpStatus.OK);
    }


}
