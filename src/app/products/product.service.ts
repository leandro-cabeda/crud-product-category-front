import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, ResponseT } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/products';

  constructor(private http: HttpClient) { }

  getProducts(filters: any = {}): Observable<ResponseT<Product[]>> {
    let params = new HttpParams();

    if (filters.name) params = params.set('name', filters.name);

    return this.http.get<ResponseT<Product[]>>(this.apiUrl, { params });
  }

  getProduct(id: number): Observable<ResponseT<Product>> {
    return this.http.get<ResponseT<Product>>(`${this.apiUrl}/${id}`);
  }

  createProduct(product: Product): Observable<ResponseT<Product>> {
    console.log("create product: ", product);
    return this.http.post<ResponseT<Product>>(this.apiUrl, product);
  }

  updateProduct(id: number, product: Product): Observable<ResponseT<Product>> {
    return this.http.patch<ResponseT<Product>>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
