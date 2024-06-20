import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-singup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './singup.component.html',
  styleUrl: './singup.component.css'
})
export class SingupComponent {

  signUpForm: FormGroup;

  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  constructor() {
    this.signUpForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  signUp() {
    const credentials = this.signUpForm.value;

    if (credentials.name && credentials.email && credentials.password) {
      this.authService.signUp(credentials.name, credentials.email, credentials.password)
        .subscribe(
          () => {
            console.log("User signed up"); // this needs to be replaced for actual logic, but for now it enough to see that it works
            this.router.navigateByUrl('/');
          }
        );
    }
  }

  ngOnInit() {
    if (this.authService.isLoggedIn())
      this.router.navigateByUrl('/');
  }
}
