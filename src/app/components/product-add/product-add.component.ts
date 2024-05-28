import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.scss'
})
export class ProductAddComponent {
  private readonly service = inject(ProductService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  productForm = this.fb.group({
    name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
    description: ['', Validators.compose([Validators.required, Validators.minLength(100)])],
    price: [null, Validators.compose([Validators.required, Validators.min(1)])],
  })

  createProduct() {
    this.productForm.markAllAsTouched();
    if (!this.productForm.valid) return;
    this.service.createProduct(this.productForm.value).subscribe({
      complete: () => this.router.navigate(['/products'])
    });
  }

  cancel() {
    this.router.navigate(['/products']);
  }
}
