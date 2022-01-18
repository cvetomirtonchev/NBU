import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { AuthenticationService } from '../../services/auth.service';

@Injectable({
    providedIn: 'root'
})

export class RoleGuardService implements CanActivate {

    constructor(private router: Router,  private authService: AuthenticationService) { }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        const expectedRole = route.data.userType;
        const user = this.authService.userValue;
        if (user.userType === expectedRole) {
            // authorised so return true
            return true;
        }

        this.router.navigate(['']);
        return false;
    }
}
