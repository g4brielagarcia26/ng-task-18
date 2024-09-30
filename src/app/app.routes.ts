import { Routes } from '@angular/router';
import { privateGuard, publicGuard } from './core/auth.guard';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home/home.component';

export const routes: Routes = [
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
    canActivateChild: [publicGuard()], // Guardia que protege la ruta, permitiendo el acceso solo si se cumplen las condiciones.
    path: 'auth',
    loadChildren: () => import('./auth/components/auth.routes'), // Carga las rutas hijas desde auth.routes de forma asíncrona.
  },
  {
    canActivateChild: [privateGuard()], // Este guardia asegura que solo los usuarios autenticados puedan acceder a esta ruta.
    path: 'userpage',
    loadChildren: () => import('./user/userpage/userpage.routes'), // Carga las rutas hijas desde userpage.routes de forma asíncrona.
  },
  {
    path: '**', //  Ruta "comodin" que se utiliza para capturar cualquier ruta que no exista. Aquí podríamos manejar un componente Not Found 404.
    redirectTo: '', // Redirige a la ruta vacía, que a su vez redirige a /home.
  }
];