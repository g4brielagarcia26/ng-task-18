import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    // Configuración para la detección de cambios en la zona con coalescencia de eventos
    provideZoneChangeDetection({ eventCoalescing: true }),
    
    // Proveedor del enrutador con las rutas configuradas
    provideRouter(routes),
    
    // Proveedor de la aplicación Firebase con la configuración de la app
    provideFirebaseApp(() => initializeApp({
      projectId: "ng-task-18-de6ab",
      appId: "1:710964730394:web:4b29a58fccf807d55d4fa3",
      storageBucket: "ng-task-18-de6ab.appspot.com",
      apiKey: "AIzaSyDX43r5C-s9tmrLAWztp83wUeLamOYNRSw",
      authDomain: "ng-task-18-de6ab.firebaseapp.com",
      messagingSenderId: "710964730394"
    })),
    
    // Proveedor de la autenticación de Firebase
    provideAuth(() => getAuth()),
    
    // Proveedor de Firestore de Firebase
    provideFirestore(() => getFirestore()), provideAnimationsAsync()
  ]
};