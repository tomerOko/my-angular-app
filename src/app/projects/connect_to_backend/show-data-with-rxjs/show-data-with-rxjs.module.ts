import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowDataWithRxjsComponent } from './show-data-with-rxjs.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ShowDataWithRxjsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ShowDataWithRxjsComponent }]),
  ],
})
export class ShowDataWithRxjsModule {}
