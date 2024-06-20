import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { shareReplay, tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { NameService } from './name.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiService = inject(ApiService);

  baseUrl = 'auth';

  login(email: string, password: string) {
    return this.apiService.postRequest(`${this.baseUrl}/login`, { email, password })
      .pipe(
        tap((res: any) => this.setSession(res as { token: string })),
        shareReplay()
      );
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");

    this.nameService.setName('');
  }

  isLoggedIn() {
    return new Date() < this.getExpiration();
  }

  getExpiration(): Date {
    const expiration = localStorage.getItem("expires_at");
    if (!expiration)
      return new Date();

    const expiresAt = JSON.parse(expiration);
    return new Date(expiresAt);
  }

  private setSession(authResult: { token: string }) {
    const expiresAt = new Date(Date.now() + this.getJwtExpiresIn(authResult.token) * 1000);

    localStorage.setItem('id_token', authResult.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt));

    this.nameService.updateName();
  }

  private getJwtExpiresIn(token: string): number {
    if (!token)
      return 0;

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      const expiresIn = decodedToken.exp! - currentTime;
      return expiresIn > 0 ? expiresIn : 0;
    } catch (error) {
      return 0;
    }
  }
}
