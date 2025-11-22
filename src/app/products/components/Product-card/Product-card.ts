import { SlicePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Product } from '@products/interfaces/products.interface';
import { productImagePipe } from '@products/pipes/product-image.pipe';
;



@Component({
  selector: 'product-card',
  imports: [RouterLink, SlicePipe, productImagePipe],
  templateUrl: './Product-card.html',
})
export class ProductCard {

  //input
  product = input.required<Product>();

}
