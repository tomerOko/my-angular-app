import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowDataAccordingToConvensionsComponent } from './show-data-according-to-convensions.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ShowDataAccordingToConvensionsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: ShowDataAccordingToConvensionsComponent },
    ]),
  ],
})
export class ShowDataAccordingToConvensionsModule {}
