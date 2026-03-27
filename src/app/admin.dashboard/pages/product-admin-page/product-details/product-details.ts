import { Component, input, inject, OnInit, signal } from '@angular/core';
import { Product } from '@app/products/interfaces/products.interface';
import { ProductCard } from "@app/products/components/Product-card/Product-card";
import { CarrouselProd } from "@app/products/components/Carrousel-prod/Carrousel-prod";
import { FormBuilder, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { FormUtils } from '@app/utils/form-utils';
import { FormErrorLabel } from "@app/shared/components/form-error-label/form-error-label";
import { ProductService } from '@app/products/services/products.services';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'product-details',
  imports: [ProductCard, CarrouselProd, ɵInternalFormsSharedModule, ReactiveFormsModule, FormErrorLabel],
  templateUrl: './product-details.html',
})
export class ProductDetails implements OnInit {
  product = input.required<Product>()

  fb = inject(FormBuilder)
  router = inject(Router)

  productServ = inject(ProductService)
  waSave = signal(false)

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


  async onSubmit() {
    const isValid = this.productForm.valid
    this.productForm.markAllAsTouched();

    if (!isValid) return;

    const formValue = this.productForm.value;

    const productlike: Partial<Product> = {
      ...(formValue as any),
      tags:
        formValue.tags
          ?.toLocaleLowerCase()
          .split(',')
          .map((tag) => tag.trim()) ?? []
    }


    // console.log({ productlike });


    if (this.product().id === "new") {
      // crear producto
      //**  el firstValue de rxjs realiza la subscirbcion automaticamente*/

      const product = await firstValueFrom(
        this.productServ.crearProduct(productlike)
      )

      console.log('Producto actualizado');
      this.router.navigate(['/admin/products', product.id])

    } else {
      await firstValueFrom(
        this.productServ.updateProduct(this.product().id, productlike)
      )
    }

    this.waSave.set(true)
    setTimeout(() => {
      this.waSave.set(false)
    }, 3000)

  }
}
