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
  errormsg: string | null = null;

  productForm = this.fb.group({
    name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
    description: ['', Validators.compose([Validators.required, Validators.minLength(50)])],
    price: [null, Validators.compose([Validators.required, Validators.min(1)])],
  })

  createProduct() {
    this.productForm.markAllAsTouched();
    if (!this.productForm.valid) return;
    this.service.createProduct(this.productForm.value).subscribe({
      complete: () => this.router.navigate(['/products']),
      error: (err) => err.status == 0 ? this.errormsg = err.error.message : err.statusText
    });
  }

  cancel() {
    this.router.navigate(['/products']);
  }
}
