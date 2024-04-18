import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {

  productId!: string;
  product!: Product;
  productFormGroup!: FormGroup;

  constructor(private route: ActivatedRoute, public productService: ProductService, private formBuilder: FormBuilder) {
    this.productId = this.route.snapshot.params['id']; // Get the id from the route, id defined in app-routing module
   }

  ngOnInit(): void {
    this.productService.getProductById(this.productId).subscribe({
      next: (data: Product) => {
        this.product = data;
        this.productFormGroup = this.formBuilder.group({
          name: this.formBuilder.control(this.product.name, [Validators.required, Validators.minLength(4)]),
          price: this.formBuilder.control(this.product.price, [Validators.required, Validators.min(200)]),
          promotion: this.formBuilder.control(this.product.promotion, [Validators.required]),
        });
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  handleUpdateProduct() {
    let product: Product = this.productFormGroup.value;
    product.id = this.productId;
    this.productService.updateProduct(product).subscribe({
      next: (data: Product) => {
        alert('Product updated successfully');
      },
      error: (error) => {
        console.log(error);
      }
    })
    }
}
