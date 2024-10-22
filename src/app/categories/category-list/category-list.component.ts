import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import {CategoryService } from '../category.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Category, ResponseT } from '../../utils';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  searchControl = new FormControl('');
  filters = {
    name: '',
  };

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((searchTerm) => this.categoryService.getCategories({ ...this.filters, name: searchTerm }))
      )
      .subscribe((response: ResponseT<Category[]>) => {
        console.log(response);
        this.categories = response.data;
      }, (error) => {
        console.error('Erro ao consultar categorias', error);
      });

    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories(this.filters).subscribe((data: ResponseT<Category[]>) => {
      console.log(data);
      this.categories = data.data;
    }, (error) => {
      console.error('Erro ao carregar categorias', error);
    });
  }

  deleteCategory(id: number) {
    if (confirm('Tem certeza que deseja excluir esta categoria?')) {
      this.categoryService.deleteCategory(id).subscribe(() => {
        this.loadCategories();
      });
    }
  }
}
