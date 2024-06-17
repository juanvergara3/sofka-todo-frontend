import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form: FormGroup;

  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  constructor() {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    const credentials = this.form.value;

    if (credentials.email && credentials.password) {
      this.authService.login(credentials.email, credentials.password)
        .subscribe(
          () => {
            console.log("User is logged in"); // this needs to be replaced for actual logic, but for now it enough to see that it works
            this.router.navigateByUrl('/');
          }
        );
    }
  }
}
