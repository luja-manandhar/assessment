import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductInterface } from '../../models/product.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, ReactiveFormsModule],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.scss'
})
export class ProductEditComponent implements OnInit{
  private readonly service = inject(ProductService);
  private readonly router = inject(Router);
  private readonly activeRoute = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  private id: number | undefined = undefined;
  product: ProductInterface | undefined = undefined;

  productForm: FormGroup = new FormGroup([]);

  ngOnInit(): void {
    const id = this.activeRoute.snapshot.params['id'];
    this.id = id;
    this.service.getProduct(id).subscribe({
      next: (res) => {
        this.product = res;
        this.productForm = this.fb.group({
          id: [res.id],
          name: [res.name, Validators.compose([Validators.required, Validators.minLength(3)])],
          description: [res.description, Validators.compose([Validators.required, Validators.minLength(100)])],
          price: [res.price, Validators.compose([Validators.required, Validators.min(1)])],
        })
      }
    });
  }

  updateProduct() {
    this.productForm.markAllAsTouched();
    if (!this.productForm.valid) return;
    this.service.updateProduct(this.productForm.value).subscribe({
      complete: () => this.router.navigate(['/products']),
      error: (err) => console.error(err)
    });
  }

  cancelUpdate() {
    this.router.navigate(['/products', this.id]);
  }

}
