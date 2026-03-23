import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductTable } from "@app/products/components/Product-table/Product-table";
import { ProductService } from '@app/products/services/products.services';
import { PaginateService } from '@app/shared/components/pagination.service';
import { Pagination } from "@app/shared/components/pagination/pagination";

@Component({
  selector: 'app-producto-admin-layout',
  imports: [ProductTable, Pagination],
  templateUrl: './producto-admin-layout.html',
})
export class ProductoAdminLayout {


  productsService = inject(ProductService);
  paginationServ = inject(PaginateService)
  productsPerPage = signal(10)


  // rxResource
  productsResource = rxResource({
    params: () => ({
      page: this.paginationServ.currentPage() - 1,
      limit: this.productsPerPage()
    }),
    stream: ({ params }) =>
      this.productsService.getProducts({
      offset: params.page * 9,
      limit:params.limit
    })
  });



}
