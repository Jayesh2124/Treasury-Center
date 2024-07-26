import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http'; // Import provideHttpClient
import { HttpClientModule } from '@angular/common/http';
export const appConfig: ApplicationConfig = {
  providers: [
    HttpClientModule,
    provideRouter(routes),
    provideAnimationsAsync(),
    provideAnimations(),
    provideHttpClient() // Add provideHttpClient to provide HttpClient
  ]
};
