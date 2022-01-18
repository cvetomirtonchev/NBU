import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { AuthenticationService } from '../../services/auth.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthenticationService,
        private alertService: AlertService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.authService.userValue;
        if (user && !this.authService.tokenExpired()) {
            // authorised so return true
            // this.authService.startRefreshTokenTimer();
            return true;
        }
        // if (user && user.expiration) {
        //     // authorised so return true
        //     this.authService.startRefreshTokenTimer();
        //     return true;
        // }

        // not logged in so redirect to login page with the return url
        setTimeout(() => {
            this.authService.logout(),
                this.alertService.warn('La session a expiré!');
        }, 3000);
        // this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
