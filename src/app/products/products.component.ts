import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products!: Product[];
  errorMessage!: string;
  searchFormGroup!: FormGroup;

  constructor(private productService: ProductService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.searchFormGroup = this.formBuilder.group({
      keyword: this.formBuilder.control(''),
    })
    this.handleGetAllProducts();
  }

  handleGetAllProducts() {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (error) => {
        this.errorMessage = error;
        console.log(this.errorMessage);
      },
    });
  }

  handleDeleteProduct(product: Product) {
    let conf = confirm('Are you sure?');
    if (!conf) return;
    this.productService.deleteProduct(product.id).subscribe({
      next: (data: boolean) => {
        let index = this.products.indexOf(product);
        this.products.splice(index, 1);
      },
      error: (error) => {
        this.errorMessage = error;
        console.log(this.errorMessage);
      },
    });
  }

  handleSetPromotion(product: Product) {
    let promo = product.promotion;
    this.productService.setPromotion(product.id).subscribe({
      next: (data: boolean) => {
        product.promotion = !promo;
      },
      error: (error) => {
        this.errorMessage = error;
        console.log(this.errorMessage);
      },
    });
  }

  handleSearchProducts() { 
    let keyword = this.searchFormGroup.value.keyword;
    this.productService.searchProducts(keyword).subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (error) => {
        this.errorMessage = error;
        console.log(this.errorMessage);
      },
    });
  }
}
