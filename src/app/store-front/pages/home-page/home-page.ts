import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductCard } from '@products/components/Product-card/Product-card';
import { ProductService } from '@products/services/products.services';


@Component({
  selector: 'app-home-page',
  imports: [ProductCard],
  templateUrl: './home-page.html',
})



export class HomePage {
  productsService = inject(ProductService);
  // rxResource
  productsResource = rxResource({
    params: () => ({}),
    stream: ({ params }) => this.productsService.getProducts({})
  });



}
