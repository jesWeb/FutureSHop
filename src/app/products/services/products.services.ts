import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product, ResponseProduct } from '@products/interfaces/products.interface';
import { delay, map, Observable, of, tap } from 'rxjs';
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

  //cache de paginacion
  private productoCache = new Map<string, ResponseProduct>();
  //cahce de un producto
  private prodCache = new Map<string, Product>();



  getProducts(options: options): Observable<ResponseProduct> {

    //desestructuracion de la url
    const { limit = 9, offset = 0, gender = '' } = options;

    const key = `${limit}-${offset}-${gender}`;
    // console.log(key);

    if (this.productoCache.has(key)) {
      return of(this.productoCache.get(key)!);
    }






    return this.http
      .get<ResponseProduct>(`${baseUrl}/products`, {
        params: {
          limit,
          offset,
          gender
        }
      })
      .pipe(
        tap((resp) => console.log(resp)),
        tap((resp) => this.productoCache.set(key, resp))
      );
  }

  //obtener productyo por id
  getProductByid(idSlug: string): Observable<Product> {

    if (this.prodCache.has(idSlug)) {
      return of(this.prodCache.get(idSlug)!)
    }


    return this.http.get<Product>(`${baseUrl}/products/${idSlug}`).pipe(tap(
      // delay(200)
      (product) => this.prodCache.set(idSlug, product)
    ))
  }


  //* obtenei id
  getProductId(id: string): Observable<Product> {

    if (this.prodCache.has(id)) {
      return of(this.prodCache.get(id)!)
    }


    return this.http.get<Product>(`${baseUrl}/products/${id}`).pipe(tap(
      // delay(200)
      (product) => this.prodCache.set(id, product)
    ))
  }

  //* actualizar
  updateProduct(id: string, productLike: Partial<Product>): Observable<Product> {
    console.log('actualizadno');
    return this.http.patch<Product>(`${baseUrl}/products/${id}`, productLike)
  }



}
