import { Component, OnInit } from '@angular/core';
import { filter, fromEvent, map, Observable, of, reduce } from 'rxjs';

@Component({
  selector: 'app-show-data-with-rxjs',
  templateUrl: './show-data-with-rxjs.component.html',
  styleUrl: './show-data-with-rxjs.component.scss',
})
export class ShowDataWithRxjsComponent implements OnInit {
  x = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
  y = this.x.pipe(
    filter((value) => value > 0),
    map((value) => value * 2),
    reduce((acc, value) => acc + value)
  );

  constructor() {
    this.y.subscribe({
      complete: () => {
        console.log('done');
      },
      next(value) {
        console.log(value);
      },
      error(err) {
        console.log('error');
        console.log(err);
      },
    });
  }

  ngOnInit() {
    const button = document.getElementById('btn');
    const click = fromEvent(button as any, 'click');
    click.subscribe({
      next: (value) => {
        console.log(value);
      },
    });
  }
}
