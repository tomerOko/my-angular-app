import { Component, OnInit } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-show-data-with-rxjs',
  templateUrl: './show-data-with-rxjs.component.html',
  styleUrl: './show-data-with-rxjs.component.scss',
})
export class ShowDataWithRxjsComponent implements OnInit {
  subject = new Subject<string>();
  constructor() {}

  presentedValue = '';

  ngOnInit() {
    this.subject.pipe(debounceTime(500)).subscribe((value) => {
      this.presentedValue = value;
    });
  }

  consoleHandler(event: KeyboardEvent) {
    const currentValue = (event.target as HTMLInputElement).value;
    this.subject.next(currentValue);
  }
}
