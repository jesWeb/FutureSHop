import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductCard } from '@products/components/Product-card/Product-card';
import { ProductService } from '@products/services/products.services';
import { Pagination } from "@app/shared/components/pagination/pagination";
import { PaginateService } from '@app/shared/components/pagination.service';



@Component({
  selector: 'app-home-page',
  imports: [ProductCard, Pagination],
  templateUrl: './home-page.html',
})



export class HomePage {
  productsService = inject(ProductService);
  paginationServ = inject(PaginateService)

  // activatedRoute = inject(ActivatedRoute);

  // currentPage = toSignal(
  //   this.activatedRoute.queryParamMap.pipe(
  //     map((params) => (params.get('page') ? +params.get('page')! : 1)),
  //     map((page) => (isNaN(page) ? 1 : page))
  //   ), {
  //   initialValue: 1
  // }
  // )


  // rxResource
  productsResource = rxResource({
    params: () => ({ page: this.paginationServ.currentPage() - 1 }),
    stream: ({ params }) => this.productsService.getProducts({
      offset: params.page * 9,
    })
  });



}
