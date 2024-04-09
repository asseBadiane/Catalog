import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products!: any[];
  constructor() {}

  ngOnInit(): void {
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
}
