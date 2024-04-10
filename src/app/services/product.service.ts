import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { PageProduct, Product } from '../models/product.model';

import * as uuid from 'uuid';

let myId = uuid.v4();

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products!: Array<Product>;

  constructor() {
    this.products = [
      {
        id: myId,
        name: 'Computer',
        price: 1300,
        promotion: true,
      },
      {
        id: myId,
        name: 'Printer',
        price: 200,
        promotion: false,
      },
      {
        id: myId,
        name: 'Laptop',
        price: 800,
        promotion: true,
      },
      {
        id: myId,
        name: 'Mobile',
        price: 500,
        promotion: true,
      },
    ];
    for (let i = 0; i < 10; i++) {
      this.products.push({
        id: myId,
        name: 'Computer' + i,
        price: 100 + i,
        promotion: true,
      });
      this.products.push({
        id: myId,
        name: 'Printer' + i,
        price: 100 + i,
        promotion: true,
      });
      this.products.push({
        id: myId,
        name: 'Laptop' + i,
        price: 100 + i,
        promotion: false,
      });
      this.products.push({
        id: myId,
        name: 'Mobile' + i,
        price: 100 + i,
        promotion: true,
      });
    }
  }

  public getAllProducts(): Observable<Product[]> {
    let rnd = Math.random();
    if(rnd > 0.1) {
      return throwError(() => new Error('Something bad happened; please try again later.'));
    }
    else
    return of(this.products);
  }

  public getPageProducts(page: number, size: number): Observable<PageProduct> {
    let index = page * size;
    let totalPages = ~~this.products.length / size;
    if(this.products.length % size != 0) {
      totalPages++;
    }
    let pageProducts = this.products.slice(index, index + size);
    return of({products: pageProducts, page: page, size: size, totalPages: totalPages});
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

  public searchProducts(keyword: string): Observable<Product[]> {
    let products = this.products.filter((p) => p.name.includes(keyword));
    return of(products);
  }
}
