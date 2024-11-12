import { Component } from '@angular/core';

interface RouteLink {
  path: string;
  label: string;
}

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  routes: RouteLink[] = [
    { path: '/tasks', label: 'Tasks' },
    { path: '/click-send-console', label: 'Click Send Console' },
    { path: '/show-data', label: 'Show Data' },
    { path: '/show-data-with-rxjs', label: 'Show Data with RxJS' },
    {
      path: '/show-data-according-to-convensions',
      label: 'Show Data According to Conventions',
    },
    {
      path: '/show-data-best-practices',
      label: 'Show Data Best Practices',
    },
  ];
}
