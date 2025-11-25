import { Component, inject, signal } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '@app/products/services/products.services';
import { map } from 'rxjs';
import { ProductCard } from "@app/products/components/Product-card/Product-card";

@Component({
  selector: 'app-gender-page',
  imports: [ProductCard],
  templateUrl: './gender-page.html',
})
export class GenderPage {

  //ruta dinamica
  route = inject(ActivatedRoute)
  productsService = inject(ProductService);

  //obtener gender
  gender = toSignal(this.route.params.pipe(map(({ gender }) => gender)))

  // rxResource
  productsResource = rxResource({
    params: () => ({ gender: this.gender() }),
    stream: ({ params }) => this.productsService.getProducts({ gender: params.gender })
  });




}
