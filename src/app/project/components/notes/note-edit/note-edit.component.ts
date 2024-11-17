// src/app/components/notes/note-edit/note-edit.component.ts
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotesService } from '../../../services/notes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteDm } from '../../../models/DMs/note.dm';

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.scss'],
})
export class NoteEditComponent implements OnInit {
  noteForm: FormGroup;
  noteId: string;

  constructor(
    private fb: FormBuilder,
    private notesService: NotesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.noteForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      tags: [''],
    });
  }

  ngOnInit(): void {
    this.noteId = this.route.snapshot.paramMap.get('id');
    if (this.noteId) {
      this.notesService.getNoteById(this.noteId).subscribe((note) => {
        this.noteForm.patchValue({
          title: note.title,
          content: note.content,
          tags: note.tags?.join(', '),
        });
      });
    }
  }

  onSubmit(): void {
    if (this.noteForm.valid) {
      const formValue = this.noteForm.value;
      const noteDm: NoteDm = {
        id: this.noteId,
        title: formValue.title,
        content: formValue.content,
        tags: formValue.tags
          ? formValue.tags.split(',').map((tag) => tag.trim())
          : [],
      };

      if (this.noteId) {
        this.notesService.updateNote(noteDm).subscribe(() => {
          this.router.navigate(['/notes', this.noteId]);
        });
      } else {
        this.notesService.createNote(noteDm).subscribe((newNote) => {
          this.router.navigate(['/notes', newNote.id]);
        });
      }
    }
  }
}
