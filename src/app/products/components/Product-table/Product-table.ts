import { Component, input } from '@angular/core';
import { Product } from '@app/products/interfaces/products.interface';
import { productImagePipe } from '@app/products/pipes/product-image.pipe';
import { RouterLink } from "@angular/router";
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'product-table',
  imports: [productImagePipe, RouterLink,CurrencyPipe],
  templateUrl: './Product-table.html',
})
export class ProductTable {
  products = input.required<Product[]>()
}
