import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './shared/components/navigation/navigation.component';

const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
  },
  {
    path: 'tasks',
    loadChildren: () =>
      import('./learning/stage_a/tasks/tasks.module').then(
        (m) => m.TasksModule
      ),
  },
  {
    path: 'click-send-console',
    loadChildren: () =>
      import(
        './learning/stage_b/click-send-console/click-send-console.module'
      ).then((m) => m.ClickSendConsoleModule),
  },
  {
    path: 'show-data',
    loadChildren: () =>
      import('./learning/stage_b/show-data/show-data.module').then(
        (m) => m.ShowDataModule
      ),
  },
  {
    path: 'show-data-with-rxjs',
    loadChildren: () =>
      import(
        './learning/stage_b/show-data-with-rxjs/show-data-with-rxjs.module'
      ).then((m) => m.ShowDataWithRxjsModule),
  },
  {
    path: 'show-data-according-to-convensions',
    loadChildren: () =>
      import(
        './learning/stage_b/show-data-according-to-convensions/show-data-according-to-convensions.module'
      ).then((m) => m.ShowDataAccordingToConvensionsModule),
  },
  {
    path: 'show-data-best-practices',
    loadChildren: () =>
      import(
        './learning/stage_b/show-data-best-practices/show-data-best-practices.module'
      ).then((m) => m.ShowDataBestPracticesModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
