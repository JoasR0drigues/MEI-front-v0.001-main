import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Despesa } from '../modelo/Despesa';

@Injectable({
  providedIn: 'root'
})
export class DespesaService {
  private baseUrl = 'http://localhost:8080/Despesa'; // Endereço do seu backend

  constructor(private http: HttpClient) {}

  // Método para obter todas as despesas
  getDespesas(): Observable<Despesa[]> {
    return this.http.get<Despesa[]>(`${this.baseUrl}`);
  }

  // Método para criar uma nova despesa
  createDespesa(despesa: Despesa): Observable<Despesa> {
    return this.http.post<Despesa>(this.baseUrl, despesa);
  }

  // Método para atualizar uma despesa
  updateDespesa(id: number, despesa: Despesa): Observable<Despesa> {
    return this.http.put<Despesa>(`${this.baseUrl}/${id}`, despesa);
  }

  // Método para excluir uma despesa
  deleteDespesa(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
