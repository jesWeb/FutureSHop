import { Component, input, inject, OnInit } from '@angular/core';
import { Product } from '@app/products/interfaces/products.interface';
import { ProductCard } from "@app/products/components/Product-card/Product-card";
import { CarrouselProd } from "@app/products/components/Carrousel-prod/Carrousel-prod";
import { FormBuilder, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { FormUtils } from '@app/utils/form-utils';

@Component({
  selector: 'product-details',
  imports: [ProductCard, CarrouselProd, ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './product-details.html',
})
export class ProductDetails implements OnInit {
  product = input.required<Product>()
  fb = inject(FormBuilder)

  //* inyeccion de formbuilder con patterns
  productForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    slug: [
      '',
      [Validators.required, Validators.pattern(FormUtils.slugPattern)]
    ],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    sizes: [['']],
    images: [[]],
    tags: [''],
    gender: ['men',
      [Validators.required, Validators.pattern(/men|women|kid|unisex/)]
    ]


  })


  sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']


  ngOnInit() {
    this.setFormValue(this.product())
    // this.productForm.reset(this.product() as any)
  }

  setFormValue(formLike: Partial<Product>) {
    this.productForm.patchValue(formLike as any)
    this.productForm.patchValue({ tags: formLike.tags?.join(',') })
  }



  //*metodo de tallas

  onSizeClicked(size: string) {
    const currentSize = this.productForm.value.sizes ?? []

    if (currentSize.includes(size)) {
      currentSize.splice(currentSize.indexOf(size), 1)
    } else {
      currentSize.push(size)
    }
    this.productForm.patchValue({ sizes: currentSize })
  }


  onSubmit() {
    console.log(this.productForm.value);

  }
}
