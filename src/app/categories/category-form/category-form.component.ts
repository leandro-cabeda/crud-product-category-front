import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router,  ActivatedRoute } from '@angular/router';
import { CategoryService } from '../category.service';
import { Category, ResponseT } from '../../utils';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent implements OnInit {
  category: Category = { name: '' };

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.categoryService.getCategory(id).subscribe((data: ResponseT<Category>) => {
        this.category = data.data;
      });
    }
  }

  onSubmit() {
    if (this.category.id) {
      this.categoryService.updateCategory( this.category.id, this.category).subscribe(() => {
        this.router.navigate(['/categories']);
      });
    } else {
      this.categoryService.createCategory(this.category).subscribe(() => {
        this.router.navigate(['/categories']);
      });
    }
  }
}
