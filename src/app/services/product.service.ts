import { Injectable } from '@angular/core';
import { Observable, of, switchMap, tap, throwError } from 'rxjs';
import { PageProduct, Product } from '../models/product.model';

import * as uuid from 'uuid';
import { HttpClient } from '@angular/common/http';

let myId = uuid.v4();

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products!: Product[];
  // private products_2!: Array<Product_2>;
  apiUrl = 'http://localhost:3000/';
  enpdoint = 'products';
  url = this.apiUrl + this.enpdoint;

  constructor(private httpClient: HttpClient) {}

  public getAllProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.url);
  }

  // Create product
  public addNewProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.url, product);
  }

  public getPageProducts(page: number, size: number): Observable<PageProduct> {
    return this.getAllProducts().pipe(
      switchMap((products) => {
        let index = page * size;
        let totalPages = ~~products.length / size;
        if (products.length % size != 0) {
          totalPages++;
        }
        let pageProducts = products.slice(index, index + size);
        return of({
          products: pageProducts,
          page: page,
          size: size,
          totalPages: totalPages,
        });
      })
    );
  }

  public deleteProduct(id: string): Observable<boolean> {
    this.products = this.products.filter((p) => p.id !== id);
    return of(true);
  }

  public setPromotion(id: string): Observable<boolean> {
    let product = this.products.find((p) => p.id === id);
    if (product !== undefined) {
      product.promotion = !product.promotion;
      return of(true);
    } else {
      return throwError(() => new Error('Product not found'));
    }
  }

  public searchProducts(
    keyword: string,
    page: number,
    size: number
  ): Observable<PageProduct> {
    let result = this.products.filter((p) => p.name.includes(keyword));
    let index = page * size;
    let totalPages = ~~result.length / size;
    if (this.products.length % size != 0) {
      totalPages++;
    }
    let pageProducts = result.slice(index, index + size);
    return of({
      products: pageProducts,
      page: page,
      size: size,
      totalPages: totalPages,
    });
  }
}
