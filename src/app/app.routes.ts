import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

import { LoginComponent } from './pages/login/login.component';
import { SingupComponent } from './pages/singup/singup.component';
import { ToDoComponent } from './pages/todo/todo.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

export const routes: Routes = [
    { path: 'login', title: 'Login', component: LoginComponent },
    { path: 'signup', title: 'SignUp', component: SingupComponent },
    { path: 'todo', title: 'ToDo', component: ToDoComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: '/todo', pathMatch: 'full' },
    { path: '**', title: 'Not found', component: PageNotFoundComponent }
];
