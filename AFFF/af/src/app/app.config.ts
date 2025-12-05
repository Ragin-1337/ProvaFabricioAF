// src/app/app.config.ts

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; 
// CORREÇÃO: Importe a constante 'routes' usando CHAVES {}
import { routes } from './app.routes'; 


export const appConfig: ApplicationConfig = {
  providers: [
    // Provedores de funcionalidades principais
    provideRouter(routes), 
    provideHttpClient() // ESSENCIAL para o TransacaoService
  ]
};