import { Routes } from "@angular/router";

export default [
  {
    path:'',
    loadComponent: () => import('./userpage.component')
  }
] as Routes 