import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./components/home/home.component').then(c => c.HomeComponent) },
  { path: 'products', loadComponent: () => import('./components/product-list/product-list.component').then(c => c.ProductListComponent) },
  { path: 'products/add', loadComponent: () => import('./components/product-add/product-add.component').then(c => c.ProductAddComponent) },
  { path: 'products/:id', loadComponent: () => import('./components/product-detail/product-detail.component').then(c => c.ProductDetailComponent) },
  { path: 'products/:id/edit', loadComponent: () => import('./components/product-edit/product-edit.component').then(c => c.ProductEditComponent) },
];
