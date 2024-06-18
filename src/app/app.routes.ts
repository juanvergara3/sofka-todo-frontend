import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

import { LoginComponent } from './components/login/login.component';
import { SingupComponent } from './components/singup/singup.component';
import { ToDoComponent } from './components/todo/todo.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const routes: Routes = [
    { path: 'login', title: 'Login', component: LoginComponent },
    { path: 'signup', title: 'SignUp', component: SingupComponent },
    { path: 'todo', title: 'ToDo', component: ToDoComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', title: 'Not found', component: PageNotFoundComponent }
];
