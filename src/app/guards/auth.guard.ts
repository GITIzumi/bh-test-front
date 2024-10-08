import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthService,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) {

    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/'], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }
}
