import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductService } from '../product.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Product, ResponseT } from '../../utils';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  searchControl = new FormControl('');
  filters = {
    name: '',
  };

  constructor(private productService: ProductService) {}

  ngOnInit(): void {

    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((searchTerm) => this.productService.getProducts({ ...this.filters, name: searchTerm }))
      )
      .subscribe((response: ResponseT<Product[]>) => {
        console.log(response);
        this.products = response.data;
      }, (error) => {
        console.error('Erro ao consultar produtos', error);
      });

    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe((data: ResponseT<Product[]>) => {
      console.log(data.data);
      this.products = data.data;
    }, (error) => {
      console.error('Erro ao carregar produtos', error);
    });
  }

  deleteProduct(id: number) {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.loadProducts();
      });
    }
  }
}
