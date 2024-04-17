import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient ,withFetch, withInterceptors, withInterceptorsFromDi} from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';


import { JwtModule } from "@auth0/angular-jwt";

export function tokenGetter() {
  return localStorage.getItem("access_token");
}


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),

    provideHttpClient(withInterceptorsFromDi()),  
    {
        provide:HTTP_INTERCEPTORS,
        useClass:AuthInterceptor,
        multi:true
    },


    importProvidersFrom(
      JwtModule.forRoot({
          config: {
              tokenGetter: tokenGetter,
              // allowedDomains: ["example.com"],
              // disallowedRoutes: ["http://example.com/examplebadroute/"],
          },
      }),
  ),
  provideHttpClient(
      withInterceptorsFromDi()
  ),
  ]
};
