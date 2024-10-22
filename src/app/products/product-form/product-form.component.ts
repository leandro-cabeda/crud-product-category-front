import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { CategoryService } from '../../categories/category.service';
import { Product, Category, ResponseT } from '../../utils';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit {
  product: Product = { name: '', description: '', quantity: 0, category: { name: '' }, price: 0 };
  categories: Category[] = [];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.productService.getProduct(id).subscribe((data: ResponseT<Product>) => {
        this.product = data.data;
      });
    }

    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe((data: ResponseT<Category[]>) => {
      console.log(data);
      this.categories = data.data;
    }, (error) => {
      console.error('Erro ao carregar categorias', error);
    });
  }

  onSubmit() {
    if (this.product.id) {
      this.productService.updateProduct(this.product.id ,this.product).subscribe(() => {
        this.router.navigate(['/products']);
      });
    } else {
      this.productService.createProduct(this.product).subscribe(() => {
        this.router.navigate(['/products']);
      });
    }
  }
}
