import { Component, inject } from '@angular/core';
// import { rxResource } from '@angular/core/rxjs-interop';
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

  // API correcta para Angular 20.3.x
  productsResource = rxResource(
    this.productsService.getProducts({})
  );
}
