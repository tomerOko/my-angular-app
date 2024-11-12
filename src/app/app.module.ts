import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
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
import { ClickSendConsoleComponent } from './projects/connect_to_backend/click-send-console/click-send-console.component';
import { ShowDataAccordingToConvensionsComponent } from './projects/connect_to_backend/projects/connect_to_backend/show-data-according-to-convensions/show-data-according-to-convensions.component';
import { ShowDataBestPracticesComponent } from './projects/connect_to_backend/projects/connect_to_backend/show-data-best-practices/show-data-best-practices.component';
import { ShowDataWithRxjsComponent } from './projects/connect_to_backend/projects/connect_to_backend/show-data-with-rxjs/show-data-with-rxjs.component';
import { ShowDataComponent } from './projects/connect_to_backend/projects/connect_to_backend/show-data/show-data.component';

@NgModule({
  declarations: [
    AppComponent,
    ClickSendConsoleComponent,
    ShowDataComponent,
    ShowDataWithRxjsComponent,
    ShowDataAccordingToConvensionsComponent,
    ShowDataBestPracticesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CardModule,
    InputTextModule,
    DropdownModule,
    CheckboxModule,
    ButtonModule,
  ],
  providers: [provideClientHydration(), provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
