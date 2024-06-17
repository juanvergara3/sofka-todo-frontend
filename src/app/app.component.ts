import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ListService } from './services/list.service';
import { List } from './interfaces/list.interface';

import { WritableSignal, signal } from '@angular/core';
import { LoginComponent } from './components/login/login.component';

import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sofka-todo-frontend';

  private listService = new ListService();
  private authService = new AuthService();

  lists: WritableSignal<List[]> = signal([]);

  getLists() {
    this.listService.getLists().subscribe((data: List[]) => {
      this.lists.set(data);
    });
  }

  logOut() {
    this.authService.logout();
  }
}
