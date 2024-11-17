import { NgModule } from '@angular/core';

import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './shared/components/navigation/navigation.component';
import { HallowComponent } from './hallow/hallow.component';
import { LoginComponent } from './project/components/auth/login/login/login.component';
import { SignupComponent } from './project/components/auth/signup/signup.component';
import { NotesListComponent } from './project/components/notes/notes-list/notes-list.component';
import { NoteDetailComponent } from './project/components/notes/note-detail/note-detail.component';
import { NoteEditComponent } from './project/components/notes/note-edit/note-edit.component';
import { NavbarComponent } from './project/components/shared/navbar/navbar.component';
import { FooterComponent } from './project/components/shared/footer/footer.component';
import { SidebarComponent } from './project/components/shared/sidebar/sidebar.component';
import { DashboardComponent } from './project/components/analytics/dashboard/dashboard.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CardModule,
    InputTextModule,
    DropdownModule,
    CheckboxModule,
    ButtonModule,
    SharedModule,
    AuthModule,
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
