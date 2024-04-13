import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent implements OnInit {

  productFormGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder, private prductService: ProductService) { }

  ngOnInit(): void {
    this.productFormGroup = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(4)]),
      price: this.formBuilder.control(0, [Validators.required, Validators.min(200)]),
      promotion: this.formBuilder.control(false, [Validators.required]),
    });
  }

  handleCreateProduct() {
    let product = this.productFormGroup.value;
    this.prductService.addNewProduct(product).subscribe({
      next: (data) => {
        alert('Product created successfully');
        this.productFormGroup.reset();
      },
      error: (err) => {
        console.log(err);
      }
    })
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
