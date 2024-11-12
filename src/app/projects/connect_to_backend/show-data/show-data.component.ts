import { Component } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';

@Component({
  selector: 'app-show-data',
  templateUrl: './show-data.component.html',
  styleUrl: './show-data.component.scss',
})
export class ShowDataComponent {
  constructor(private http: ApiService) {}

  public buttons = [
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

  public result: string = '';

  async handleClick(url: string, body?: Record<string, any>): Promise<void> {
    console.log('Sending request to backend');
    const mehtod = body ? 'post' : 'get';
    await this.http[mehtod](url, body).subscribe({
      next: (response) => {
        console.log('Response from backend:', response);
        this.result = JSON.stringify(response);
      },
      error: (error) => {
        console.error('Error from backend:', error);
      },
    });
  }
}
