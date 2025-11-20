import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ResponseProduct } from '@products/interfaces/products.interface';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';


const baseUrl = environment.baseUrl;

interface options {
  limit?: number
  offset?: number
  gender?: number
}

@Injectable({ providedIn: 'root' })
export class ProductService {

  private http = inject(HttpClient);

  getProducts(options: options): Observable<ResponseProduct> {

    //desestructuracion de la url
    const { limit = 9, offset = 0, gender = '' } = options;

    return this.http
      .get<ResponseProduct>(`${baseUrl}/products`, {
        params: {
          limit,
          offset,
          gender
        }
      })
      .pipe(tap((resp) => console.log(resp)));
  }

}
