// src/app/services/conta.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Conta } from '../modelo/Conta';

@Injectable({
  providedIn: 'root'
})
export class ContaService {
  private baseUrl = 'http://localhost:8080/Conta';  // URL do back-end

  constructor(private http: HttpClient) { }

  getContas(): Observable<Conta[]> {
    return this.http.get<Conta[]>(`${this.baseUrl}`);
  }

  getContaById(id: number): Observable<Conta> {
    return this.http.get<Conta>(`${this.baseUrl}/${id}`);
  }

  createConta(conta: Conta): Observable<Conta> {
    return this.http.post<Conta>(`${this.baseUrl}`, conta);
  }

  updateConta(id: number, conta: Conta): Observable<Conta> {
    return this.http.put<Conta>(`${this.baseUrl}/${id}`, conta);
  }

  deleteConta(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
