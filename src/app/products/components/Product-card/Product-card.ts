import { Component, computed, input } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { RouterLink } from '@angular/router'
import { Product } from '@products/interfaces/products.interface';
import { productImagePipe } from '@products/pipes/product-image.pipe';

@Component({
  selector: 'product-card',
  imports: [RouterLink, SlicePipe, productImagePipe],
  templateUrl: './Product-card.html',
})
export class ProductCard {

  //input
  // product = input.required<Product>();
  product = input.required<Product>();
  // opcion dos
  // imageUrl = computed(() => {
  //   return `http://localhost:3000/api/files/product/${this.product().images[0]
  //     }`;
  // });

}
