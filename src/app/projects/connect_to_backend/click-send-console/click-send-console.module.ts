import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickSendConsoleComponent } from './click-send-console.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ClickSendConsoleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ClickSendConsoleComponent }]),
  ],
})
export class ClickSendConsoleModule {}
