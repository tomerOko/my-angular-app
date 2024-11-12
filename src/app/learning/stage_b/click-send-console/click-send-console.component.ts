import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';

@Component({
  selector: 'app-click-send-console',
  templateUrl: './click-send-console.component.html',
  styleUrl: './click-send-console.component.scss',
})
export class ClickSendConsoleComponent {
  constructor(private http: ApiService) {}
  buttons = [
    { text: 'test', onClick: () => this.handleClick('test') },
    {
      text: 'elastic post',
      onClick: () => this.handleClick('elastic', {}),
    },
    {
      text: 'elastic get',
      onClick: () => this.handleClick('elastic'),
    },
    {
      text: 'mongo post',
      onClick: () => this.handleClick('mongo'),
    },
    { text: 'mongo get', onClick: () => this.handleClick('mongo') },
  ];

  async handleClick(url: string, body?: Record<string, any>): Promise<void> {
    console.log('Sending request to backend');
    if (body) {
      await this.http.post(url, body).subscribe({
        next: (response) => {
          console.log('Response from backend:', response);
        },
        error: (error) => {
          console.error('Error from backend:', error);
        },
      });
    } else {
      await this.http.get(url).subscribe({
        next: (response) => {
          console.log('Response from backend:', response);
        },
        error: (error) => {
          console.error('Error from backend:', error);
        },
      });
    }
  }
}
