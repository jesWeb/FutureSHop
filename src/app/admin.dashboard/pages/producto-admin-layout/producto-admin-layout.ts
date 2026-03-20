import { Component } from '@angular/core';
import { ProductTable } from "@app/products/components/Product-table/Product-table";

@Component({
  selector: 'app-producto-admin-layout',
  imports: [ProductTable],
  templateUrl: './producto-admin-layout.html',
})
export class ProductoAdminLayout { }
