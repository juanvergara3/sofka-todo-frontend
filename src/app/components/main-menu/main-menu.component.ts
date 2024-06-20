import { Component, inject, Signal, computed } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { NameService } from '../../services/name.service';

@Component({
  selector: 'app-main-menu',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.css'
})
export class MainMenuComponent {

  authService = inject(AuthService);
  nameService = inject(NameService);
  router = inject(Router);

  nameComputed: Signal<string> = computed(() => this.nameService.nameSignal());

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
