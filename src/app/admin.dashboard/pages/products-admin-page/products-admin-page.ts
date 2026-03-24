import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductService } from '@app/products/services/products.services';
import { PaginateService } from '@app/shared/components/pagination.service';
import { Pagination } from "@app/shared/components/pagination/pagination";
import { ProductTable } from "@app/products/components/Product-table/Product-table";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-products-admin-page',
  imports: [Pagination, ProductTable, RouterLink],
  templateUrl: './products-admin-page.html',
})
export class ProductsAdminPage {
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
        limit: params.limit
      })
  });
}
