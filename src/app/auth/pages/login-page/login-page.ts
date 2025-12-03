import { Component, inject, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { ReactiveFormsModule, FormBuilder, Validators, } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, RouterLink,],
  templateUrl: './login-page.html',
})
export class LoginPage {

  fb = inject(FormBuilder);
  hasError = signal(false);
  IsPosting = signal(false);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  onSubmit() {
    if (this.loginForm) {
      this.hasError.set(true)
      setTimeout(() => {
        this.hasError.set(false)
      }, 2500);
      return
    }

    const { email = '', password = '' } = this.loginForm;

    console.log('====================================');
    console.log({ email, password });
    console.log('====================================');
  }

}
