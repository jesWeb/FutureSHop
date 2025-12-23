import { Routes } from '@angular/router';
import { NotAutenticatedGuard } from './auth/guards/not-autebticated.guard';

export const routes: Routes = [


  //route de auth
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes'),
    //TODO: GUARDS
    canMatch: [
      NotAutenticatedGuard,
      //tambien puedes areagar funciones aqui
      // () => {
      //   console.log('hola desde la ruta del guartd');
      //   return false

      // }
    ]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin.dashboard/admin-dashboard.routes').then(dash=>dash.adminDashboardRoutes)
  }
  ,

  {
    path: '',
    loadChildren: () => import('./store-front/store-front.routes').then(fro => fro.StoreFrontRoutes)
  }



];
