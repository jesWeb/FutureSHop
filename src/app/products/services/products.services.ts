import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Gender, Product, ResponseProduct } from '@products/interfaces/products.interface';
import { delay, forkJoin, map, Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { User } from '@app/auth/interfaces/user.interface';


const baseUrl = environment.baseUrl;

interface options {
  limit?: number
  offset?: number
  gender?: number
}

const emptyProduct: Product = {
  id: 'new',
  title: '',
  price: 0,
  description: '',
  slug: '',
  stock: 0,
  sizes: [],
  gender: Gender.Men,
  tags: [],
  images: [],
  user: {} as User
}



@Injectable({ providedIn: 'root' })
export class ProductService {

  private http = inject(HttpClient);

  //cache de paginacion
  private productsCache = new Map<string, ResponseProduct>();
  //cahce de un producto
  private productCache = new Map<string, Product>();



  getProducts(options: options): Observable<ResponseProduct> {

    //desestructuracion de la url
    const { limit = 9, offset = 0, gender = '' } = options;

    const key = `${limit}-${offset}-${gender}`;
    // console.log(key);

    if (this.productsCache.has(key)) {
      return of(this.productsCache.get(key)!);
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
        tap((resp) => this.productsCache.set(key, resp))
      );
  }

  //obtener productyo por id
  getProductByid(idSlug: string): Observable<Product> {

    if (this.productCache.has(idSlug)) {
      return of(this.productCache.get(idSlug)!)
    }
    return this.http.
      get<Product>(`${baseUrl}/products/${idSlug}`)
      .pipe(tap(
        // delay(200)
        (product) => this.productCache.set(idSlug, product)
      ))
  }


  //* obtenei id
  getProductId(id: string): Observable<Product> {

    if (id == 'new') {
      return of(emptyProduct)
    }

    if (this.productCache.has(id)) {
      return of(this.productCache.get(id)!)
    }

    return this.http.get<Product>(`${baseUrl}/products/${id}`).pipe(tap(
      // delay(200)
      (product) => this.productCache.set(id, product)
    ))
  }

  //*crear prodcuto
  crearProduct(productLike: Partial<Product>): Observable<Product> {
    return this.http
      .post<Product>(`${baseUrl}/products`, productLike)
      .pipe(tap((product) => this.updateProductCache(product)))
  }

  //* actualizar
  updateProduct(id: string, productLike: Partial<Product>): Observable<Product> {
    console.log('actualizadno');
    return this.http
      .patch<Product>(`${baseUrl}/products/${id}`, productLike)
      .pipe(tap((product) => this.updateProductCache(product)))
  }

  // * actualizar cache de producto - para VERLO DESDE LA PANTALLA DE INICIO
  updateProductCache(product: Product) {

    const prodId = product.id

    this.productCache.set(prodId, product)

    this.productsCache.forEach((productResponse) => {
      productResponse.products = productResponse.products.map((curretProduct) => {
        return curretProduct.id === prodId ? product : curretProduct;
      })
    })

    console.log('Cache actualizado');

  }

  //* toma files list y lo suba

  //*sube varios
  uploadImages(images?: FileList): Observable<string[]> {
    if (!images) return of([]);
    const uploadObservable = Array.from(images).map((imageFile) =>
      this.uploadImage(imageFile))
    return forkJoin(uploadObservable).pipe(
      tap((imageNames) => console.log({ imageNames })
      )
    )
  }


  //* sube uno
  uploadImage(image: File): Observable<string> {
    const fromData = new FormData()
    fromData.append('file', image)

    return this.http.post<{ filename: string }>(`${baseUrl}/files/product`, fromData).pipe(map((resp) => resp.filename))
  }

}
