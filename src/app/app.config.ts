import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { routes } from './pages/app.routes';
import { environment } from '../environments/environment';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { ReCaptchaV3Provider } from '@angular/fire/app-check';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(ReCaptchaV3Provider),
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: environment.captchaGoogle.passwordWeb } as RecaptchaSettings,
    },
    provideRouter(routes),

    provideAnimationsAsync(),
    provideToastr({timeOut:4000,preventDuplicates:true}),
    provideHttpClient(withFetch()),
    
    
    provideFirebaseApp( () => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()), provideAnimationsAsync()
  ]
};
