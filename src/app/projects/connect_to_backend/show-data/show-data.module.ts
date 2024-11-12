import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowDataComponent } from './show-data.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ShowDataComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ShowDataComponent }]),
  ],
})
export class ShowDataModule {}
