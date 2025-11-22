import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CarrouselProd } from '@app/products/components/Carrousel-prod/Carrousel-prod';
import { ProductService } from '@app/products/services/products.services';

@Component({
  selector: 'app-product-page',
  imports: [CarrouselProd],
  templateUrl: './product-page.html',
})
export class ProductPage {
  //RUTA ACTIVA
  activatedRoute = inject(ActivatedRoute)
  //servicio
  productService = inject(ProductService)
  //id
  productIdSlug = this.activatedRoute.snapshot.params['idSlug']


  //rxResource
  porductResource = rxResource({
    params: () => ({ idSlug: this.productIdSlug }),
    stream: ({ params }) => this.productService.getProductByid(params.idSlug)
  });






}
