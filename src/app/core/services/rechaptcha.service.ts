import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RechaptchaService {
  http = inject( HttpClient)

  constructor() { }

  validateRecaptcha(token: string): Observable<any> {
    const url = 'https://www.google.com/recaptcha/api/siteverify';
    const body = new URLSearchParams();
    body.set('secret', environment.captchaGoogle.secretPassword);
    body.set('response', token);

    return this.http.post(url, body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
  }
}
