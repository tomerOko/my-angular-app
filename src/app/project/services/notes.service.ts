// src/app/services/notes.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NoteDm } from '../models/DMs/note.dm';
import { NoteDto } from '../models/dtos/note.dto';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { NotesTransformer } from '../transformers/notes.transformer';
import { environment } from '../env/dev';

@Injectable({ providedIn: 'root' })
export class NotesService {
  private notesSubject = new BehaviorSubject<NoteDm[]>([]);
  public notes$ = this.notesSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadNotes(): void {
    this.http
      .get<NoteDto[]>(`${environment.apiUrl}/notes`)
      .pipe(
        map((dtos) => dtos.map((dto) => NotesTransformer.dtoToDm(dto))),
        tap((dms) => this.notesSubject.next(dms))
      )
      .subscribe();
  }

  getNoteById(id: string): Observable<NoteDm> {
    return this.http
      .get<NoteDto>(`${environment.apiUrl}/notes/${id}`)
      .pipe(map((dto) => NotesTransformer.dtoToDm(dto)));
  }

  createNote(noteDm: NoteDm): Observable<NoteDm> {
    const noteDto = NotesTransformer.dmToDto(noteDm);
    return this.http.post<NoteDto>(`${environment.apiUrl}/notes`, noteDto).pipe(
      map((dto) => NotesTransformer.dtoToDm(dto)),
      tap((newDm) => {
        const currentNotes = this.notesSubject.getValue();
        this.notesSubject.next([...currentNotes, newDm]);
      })
    );
  }

  updateNote(noteDm: NoteDm): Observable<NoteDm> {
    const noteDto = NotesTransformer.dmToDto(noteDm);
    return this.http
      .put<NoteDto>(`${environment.apiUrl}/notes/${noteDm.id}`, noteDto)
      .pipe(
        map((dto) => NotesTransformer.dtoToDm(dto)),
        tap((updatedDm) => {
          const currentNotes = this.notesSubject.getValue();
          const index = currentNotes.findIndex(
            (note) => note.id === updatedDm.id
          );
          currentNotes[index] = updatedDm;
          this.notesSubject.next([...currentNotes]);
        })
      );
  }

  deleteNote(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/notes/${id}`).pipe(
      tap(() => {
        const currentNotes = this.notesSubject
          .getValue()
          .filter((note) => note.id !== id);
        this.notesSubject.next(currentNotes);
      })
    );
  }
}
