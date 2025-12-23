import { Routes } from '@angular/router';
import { AdminDashboardLayout } from './layouts/admin-dashboard-layout/admin-dashboard-layout';
import { ProductoAdminLayout } from './pages/producto-admin-layout/producto-admin-layout';

export const adminDashboardRoutes: Routes = [{
  path: '',
  component: AdminDashboardLayout,
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
      redirectTo:'products'
    },
  ]
}]
