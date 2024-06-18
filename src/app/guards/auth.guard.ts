import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';

export function authGuardFactory(authService: AuthService, router: Router): CanActivateFn {
  return (route, state) => {
    if (!authService.isLoggedIn()) {
      router.navigate(['/login']);
      return false;
    }

    return true;
  };
}

@Injectable({
  providedIn: 'root',
  useFactory: authGuardFactory,
  deps: [AuthService, Router]
})
export class AuthGuard { }
