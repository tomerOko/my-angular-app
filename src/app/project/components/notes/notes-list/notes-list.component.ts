// src/app/components/notes/notes-list/notes-list.component.ts
import { Component, OnInit } from '@angular/core';
import { NotesService } from '../../../services/notes.service';
import { NoteDm } from '../../../models/DMs/note.dm';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
})
export class NotesListComponent implements OnInit {
  notes$: Observable<NoteDm[]>;

  constructor(private notesService: NotesService) {}

  ngOnInit() {
    this.notes$ = this.notesService.notes$;
    this.notesService.loadNotes();
  }
}
