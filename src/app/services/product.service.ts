import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products!: Array<Product>;

  constructor() {
    this.products = [
      {
        id: 1,
        name: 'Computer',
        price: 1300,
      },
      {
        id: 2,
        name: 'Printer',
        price: 200,
      },
      {
        id: 3,
        name: 'Laptop',
        price: 800,
      },
      {
        id: 4,
        name: 'Mobile',
        price: 500,
      },
    ];
  }

  public getAllProducts(): Observable<Product[] > {
    let rnd = Math.random();
    // if(rnd > 0.1) {
    //   return throwError('Something bad happened; please try again later.');
    // }
    // else
    return of(this.products);
  }

  public deleteProduct(id: number): Observable<boolean> {
    this.products = this.products.filter((p) => p.id !== id);
    return of(true) ;
  }
}
