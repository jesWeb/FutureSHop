import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { ReactiveFormsModule, FormBuilder, Validators, } from '@angular/forms';
import { AuthService } from '@app/auth/services/auth.service';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, RouterLink,],
  templateUrl: './login-page.html',
})
export class LoginPage {

  fb = inject(FormBuilder);
  hasError = signal(false);
  IsPosting = signal(false);
  router = inject(Router)

  authService = inject(AuthService)

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  onSubmit() {

    if (this.loginForm.invalid) {
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false)
      }, 2500);
      return
    }

    const { email = '', password = '' } = this.loginForm.value;

    this.authService.login(email!, password!).subscribe((isAutenticado) => {

      if (isAutenticado) {
        this.router.navigateByUrl('/')
        return
      }

      this.hasError.set(true);

      setTimeout(() => {
        this.hasError.set(false)

      }, 2000)


    })

    // checkautenticacion

    //regidtro

    //logout


  }

}
