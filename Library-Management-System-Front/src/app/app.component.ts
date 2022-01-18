import { Component } from '@angular/core';
import { User } from './shared/models/user';
import { AuthenticationService } from './core/services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {
    user: User;

    constructor(private authService: AuthenticationService) {
        this.authService.user.subscribe(x => this.user = x);
    }
    logout() {
        this.authService.logout();
    }
}
