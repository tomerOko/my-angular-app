// src/app/interceptors/error.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as apm from '@elastic/apm-rum';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private apmInstance: any;
  constructor() {
    this.apmInstance = apm.init({
      serviceName: 'angular-app',
      serverUrl: 'http://localhost:8200',
      environment: 'development',
    });
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<any> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Log error to Elastic APM
        this.apmInstance.captureError(error);

        // Handle specific error statuses
        if (error.status === 401) {
          // Handle unauthorized error
        } else if (error.status === 403) {
          // Handle forbidden error
        }
        return throwError(error);
      })
    );
  }
}
