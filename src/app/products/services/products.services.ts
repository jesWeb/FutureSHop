import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ResponseProduct } from '@products/interfaces/products.interface';
import { Observable, tap } from 'rxjs';



@Injectable({ providedIn: 'root' })
export class ProductService {

  private http = inject(HttpClient);

  getProducts(): Observable<ResponseProduct> {

    return this.http.get<ResponseProduct>('localhost:3000/api/products')
      .pipe(tap((resp) => console.log(resp)));
  }

}
