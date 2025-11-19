import { Routes } from '@angular/router';

export const routes: Routes = [


  {
    path: '',
    loadChildren: () => import('./store-front/store-front.route').then(fro => fro.StoreFrontRoutes)
  }



];
