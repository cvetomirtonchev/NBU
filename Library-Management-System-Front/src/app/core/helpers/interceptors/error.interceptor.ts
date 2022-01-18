import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authService: AuthenticationService,
        private router: Router,
        private alertService: AlertService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authService.logout();
            }

            const error = err.error.message || err.statusText;
            if (err.status === 502) {
                this.router.navigate(['account/verify-email']);
            }
            if (err.status === 0) {
                this.alertService.error('Le serveur ne répond pas!');
            } else {
                this.alertService.error(error);
            }
            return throwError(error);
        }));
    }
}
