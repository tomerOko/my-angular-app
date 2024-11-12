import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowDataBestPracticesComponent } from './show-data-best-practices.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ShowDataBestPracticesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: ShowDataBestPracticesComponent },
    ]),
  ],
})
export class ShowDataBestPracticesModule {}
