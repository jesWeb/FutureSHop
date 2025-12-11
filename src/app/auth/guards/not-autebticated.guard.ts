import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { firstValueFrom } from 'rxjs';

export const NotAutenticatedGuard: CanMatchFn = async (
  route: Route,
  segments: UrlSegment[]
) => {


  const authServ = inject(AuthService);
  const router = inject(Router)

  const isAutenticated = await firstValueFrom(authServ.checkStatus())

  if (isAutenticated) {
    router.navigateByUrl('/')
    return false
  }


  console.log('not autenticado');

  return true;
}
