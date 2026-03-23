import { Component, effect, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '@app/products/services/products.services';
import { map } from 'rxjs';
import { ProductDetails } from './product-details/product-details';

@Component({
  selector: 'app-product-admin-page',
  imports: [ProductDetails],
  templateUrl: './product-admin-page.html',
})
export class ProductAdminPage {

  ActiRoute = inject(ActivatedRoute)
  router = inject(Router)
  productService = inject(ProductService)

  // * senal
  productId = toSignal(
    this.ActiRoute.params.pipe(map((params) => params['id']))
  )

  //* recurso de producto - ya usamos params y stream

  productResource = rxResource({
    params: () => ({ id: this.productId() }),

    stream: ({ params }) => {
      return this.productService.getProductId(params.id);
    }
  });

  //*efecto por si falla */
  redirectEffect = effect(() => {
    if (this.productResource.error()) {
      this.router.navigate(['/admin/products'])
    }
  })

}
