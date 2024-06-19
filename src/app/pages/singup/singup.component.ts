import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-singup',
  standalone: true,
  imports: [],
  templateUrl: './singup.component.html',
  styleUrl: './singup.component.css'
})
export class SingupComponent {

  authService = inject(AuthService);
  router = inject(Router);

  ngOnInit() {
    if (this.authService.isLoggedIn())
      this.router.navigateByUrl('/');
  }
}
