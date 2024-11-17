import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesRoutingModule } from './notes-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { NotesListComponent } from './notes-list/notes-list.component';
import { NoteDetailComponent } from './note-detail/note-detail.component';
import { NoteEditComponent } from './note-edit/note-edit.component';

@NgModule({
  declarations: [NotesListComponent, NoteDetailComponent, NoteEditComponent],
  imports: [CommonModule, ReactiveFormsModule, NotesRoutingModule],
})
export class NotesModule {}
