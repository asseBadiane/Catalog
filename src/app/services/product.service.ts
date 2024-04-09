import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products!: any[];

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

  public getAllProducts(): Observable<any> {
    let rnd = Math.random();
    // if(rnd > 0.1) {
    //   return throwError('Something bad happened; please try again later.');
    // }
    // else
    return of(this.products);
  }

  public deleteProductById(id: number): Observable<any> {
    const index = this.products.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
    }
    return of(null);
  }
}
