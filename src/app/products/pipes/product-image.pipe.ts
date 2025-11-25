import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '@env/environment';


const baseUrl = environment.baseUrl;

@Pipe({
  name: 'productImage'
})

export class productImagePipe implements PipeTransform {

  transform(value: string | string[]): string {

    if (typeof value === 'string') {
      return `${baseUrl}/files/product/${value}`;
    }

    const img = value.at(0) // at(0)

    if (!img) {
      return "./assets/images/no-image.jpg"
    }

    return `${baseUrl}/files/product/${value}`;

  }
}
