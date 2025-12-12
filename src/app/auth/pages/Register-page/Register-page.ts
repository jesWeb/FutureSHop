import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './Register-page.html',
})
export class RegisterPage {

  fb = inject(FormBuilder)
  hasError = signal(false)
  IsPosting = signal(false);
  router = inject(Router)

  authServ = inject(AuthService)


  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    nombre: ['', [Validators.required, Validators.minLength(6)]]
  })



  onSubmit() {

    if (this.registerForm.invalid) {
      this.hasError.set(true)
      setTimeout(() => {
        this.hasError.set(false)
      }, 2000);
      return
    }

    const { email = '', password = '', nombre = '' } = this.registerForm.value;

    this.authServ.register(email!, password!, nombre!).subscribe((isCreate) => {

      if (isCreate) {
        this.router.navigateByUrl('/')
        return
      }

      this.hasError.set(true);

      setTimeout(() => {
        this.hasError.set(false)
      }, 2000);


    })


  }

}
