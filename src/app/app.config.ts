import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideFlatpickrDefaults } from 'angularx-flatpickr';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)
    ,importProvidersFrom(
      CalendarModule.forRoot({
        provide: DateAdapter,
        useFactory: adapterFactory,
      })
    ),
    provideAnimations(),
    provideFlatpickrDefaults(),
    provideHttpClient(),
  ]
};
