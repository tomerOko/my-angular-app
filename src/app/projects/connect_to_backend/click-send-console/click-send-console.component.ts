import { Component } from '@angular/core';

@Component({
  selector: 'app-click-send-console',
  templateUrl: './click-send-console.component.html',
  styleUrl: './click-send-console.component.scss',
})
export class ClickSendConsoleComponent {
  buttons = [
    { text: 'Button 1', onClick: () => this.handleClick('Button 1') },
    { text: 'Button 2', onClick: () => this.handleClick('Button 2') },
    { text: 'Button 3', onClick: () => this.handleClick('Button 3') },
    { text: 'Button 4', onClick: () => this.handleClick('Button 4') },
  ];

  handleClick(buttonText: string): void {
    console.log(`${buttonText} clicked`);
    // Add any additional functionality here
  }
}
