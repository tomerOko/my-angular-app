// src/app/components/notes/note-detail/note-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotesService } from '../../../services/notes.service';
import { Observable } from 'rxjs';
import { NoteDm } from '../../../models/DMs/note.dm';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.scss'],
})
export class NoteDetailComponent implements OnInit {
  note$: Observable<NoteDm>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notesService: NotesService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.note$ = this.notesService.getNoteById(id);
  }

  editNote(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['/notes', id, 'edit']);
  }

  deleteNote(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.notesService.deleteNote(id).subscribe(() => {
      this.router.navigate(['/notes']);
    });
  }
}
