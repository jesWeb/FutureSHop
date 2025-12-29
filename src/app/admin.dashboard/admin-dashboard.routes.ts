import { Routes } from '@angular/router';
import { AdminDashboardLayout } from './layouts/admin-dashboard-layout/admin-dashboard-layout';
import { ProductoAdminLayout } from './pages/producto-admin-layout/producto-admin-layout';
import { isAdminGuard } from '@app/auth/guards/is-admin.guard';

export const adminDashboardRoutes: Routes = [{
  path: '',
  component: AdminDashboardLayout,
  canMatch: [
    isAdminGuard
  ],
  children: [
    {
      path: 'products',
      component: ProductoAdminLayout
    },
    {
      path: 'products/:id',
      component: ProductoAdminLayout
    },
    {
      path: '**',
      redirectTo: 'products'
    },
  ]
}]
