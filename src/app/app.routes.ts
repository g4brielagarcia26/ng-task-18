import { Routes } from '@angular/router';
import { privateGuard, publicGuard } from './core/auth.guard';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home/home.component';

export const routes: Routes = [
  {
    path: 'app-root',
    component: AppComponent, // Componente del home
  },
  {
    path: '', // Ruta vacía redirige a Home
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent, // Ruta para el componente de Home
  },
  {
    canActivateChild: [publicGuard()],
    path: 'auth',
    loadChildren: () => import('./auth/components/auth.routes'),
  },
  {
    canActivateChild: [privateGuard()],
    path: 'userpage',
    loadChildren: () => import('./user/userpage/userpage.routes'),
  },
  {
    path: '**',
    redirectTo: '',
  }
];