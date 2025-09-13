import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: '**',
    redirectTo: '',
    title: 'Classificador de Emails com IA',
    component: AppComponent,
  },
];
