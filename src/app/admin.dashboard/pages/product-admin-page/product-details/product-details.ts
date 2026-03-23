import { Component, input, inject, OnInit } from '@angular/core';
import { Product } from '@app/products/interfaces/products.interface';
import { ProductCard } from "@app/products/components/Product-card/Product-card";
import { CarrouselProd } from "@app/products/components/Carrousel-prod/Carrousel-prod";
import { FormBuilder, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { FormUtils } from '@app/utils/form-utils';
import { FormErrorLabel } from "@app/shared/components/form-error-label/form-error-label";
import { ProductService } from '@app/products/services/products.services';

@Component({
  selector: 'product-details',
  imports: [ProductCard, CarrouselProd, ɵInternalFormsSharedModule, ReactiveFormsModule, FormErrorLabel],
  templateUrl: './product-details.html',
})
export class ProductDetails implements OnInit {
  product = input.required<Product>()
  fb = inject(FormBuilder)
  productServ = inject(ProductService)

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
    const isValid = this.productForm.valid
    this.productForm.markAllAsTouched();

    if (!isValid) return;

    const formValue = this.productForm.value;

    const productlike: Partial<Product> = {
      ...(formValue as any),
      tags:
        formValue.tags?.toLocaleLowerCase()
          .split(',')
          .map((tag) => tag.trim()) ?? []
    }


    console.log({ productlike });

    this.productServ.updateProduct(this.product().id, productlike).subscribe(
      producto => {
        console.log('Producto actualizado');

      }
    )

  }
}
