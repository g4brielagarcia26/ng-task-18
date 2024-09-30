import { Routes } from "@angular/router";
import { publicGuard } from "../../core/auth.guard";

// Ruta hija para definir SigInComponent
export default [
  {
    canActivateChild: [publicGuard()],
    path: 'sign-in',
    loadComponent: () => import('./sign-in/sing-in.component')
  }
] as Routes