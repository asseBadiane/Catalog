import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { PageProduct, Product } from '../models/product.model';

import * as uuid from 'uuid';
import { ValidationErrors } from '@angular/forms';

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

  public searchProducts(keyword: string, page: number, size: number): Observable<PageProduct> {
    let result = this.products.filter((p) => p.name.includes(keyword));
    let index = page * size;
    let totalPages = ~~result.length / size;
    if(this.products.length % size != 0) {
      totalPages++;
    }
    let pageProducts = result.slice(index, index + size);
    return of({products: pageProducts, page: page, size: size, totalPages: totalPages});
  }

  public addNewProduct(product: Product): Observable<Product> {
    product.id = myId;
    this.products.push(product);
    return of(product);
  }

  public getProductById(id: string): Observable<Product> {
    let product = this.products.find((p) => p.id === id);
    if (product === undefined) return throwError(() => new Error("Product not found"));
    return of(product);
  }

  public updateProduct(product: Product): Observable<Product> {
    let index = this.products.findIndex((p) => p.id === product.id);
    if (index === -1) return throwError(() => new Error("Product not found"));
    this.products[index] = product;
    return of(product);
  }

  getErrorMessage(fieldName: string, error: ValidationErrors) {
    if (error['required']) {
        return fieldName + ' is required';
    }
    else if (error['minlength']) {
        return fieldName + ' should have at least ' + error['minlength']['requiredLength'] + ' characters';
    }
    else if (error['min']) {
        return fieldName + ' should have min value ' + error['min']['min'];
    } 
    else return '';
    
}
}
