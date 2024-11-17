import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotesListComponent } from './notes-list/notes-list.component';
import { NoteDetailComponent } from './note-detail/note-detail.component';
import { NoteEditComponent } from './note-edit/note-edit.component';

const routes: Routes = [
  { path: '', component: NotesListComponent },
  { path: 'new', component: NoteEditComponent },
  { path: ':id', component: NoteDetailComponent },
  { path: ':id/edit', component: NoteEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotesRoutingModule {}
