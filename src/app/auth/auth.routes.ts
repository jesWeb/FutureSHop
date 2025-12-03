import { Routes } from "@angular/router";
import { AuthLayout } from "./layouts/auth-layout/auth-layout";
import { LoginPage } from "./pages/login-page/login-page";
import { RegisterPage } from "./pages/Register-page/Register-page";

export const authRoutes: Routes = [
  {
    path: '',
    component: AuthLayout,
    children: [{
      path: 'login',
      component: LoginPage
    },
    {
      path: 'Register',
      component: RegisterPage
    },
    {
      path: '**',
      redirectTo: 'login'
    }

    ]

  }
]


export default authRoutes;
