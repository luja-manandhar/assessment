import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { EMPTY, Observable, tap } from 'rxjs';
import { ProductInterface } from '../../models/product.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { CurrencyFormatPipe } from '../../pipes/currency-format.pipe';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, CurrencyFormatPipe, RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit{
  private readonly service = inject(ProductService);
  private readonly activeRoute = inject(ActivatedRoute);
  product$: Observable<ProductInterface> = EMPTY;
  errormsg: string | null = null;

  ngOnInit(): void {
    const id = this.activeRoute.snapshot.params['id'];
    this.product$ = this.service.getProduct(id).pipe(
        tap({error: (err) => this.errormsg = err.status === 0 ? err.error.message : err.statusText })
    );
  }
}
