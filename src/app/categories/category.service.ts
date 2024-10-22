import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, ResponseT } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:8080/categories';

  constructor(private http: HttpClient) {}

  getCategories(filters: any = {}): Observable<ResponseT<Category[]>> {
    let params = new HttpParams();

    if (filters.name) params = params.set('name', filters.name);

    return this.http.get<ResponseT<Category[]>>(this.apiUrl, { params });
  }

  getCategory(id: number): Observable<ResponseT<Category>> {
    return this.http.get<ResponseT<Category>>(`${this.apiUrl}/${id}`);
  }

  createCategory(category: Category): Observable<ResponseT<Category>> {
    return this.http.post<ResponseT<Category>>(this.apiUrl, category);
  }

  updateCategory(id: number, category: Category): Observable<ResponseT<Category>> {
    return this.http.patch<ResponseT<Category>>(`${this.apiUrl}/${id}`, category);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


}
