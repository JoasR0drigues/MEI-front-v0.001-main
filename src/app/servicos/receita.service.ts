import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Receita } from '../modelo/Receita';

@Injectable({
  providedIn: 'root'
})
export class ReceitaService {
  private baseUrl = 'http://localhost:8080/Receita'; // URL do endpoint do backend

  constructor(private http: HttpClient) {}

  // Método para obter todas as receitas
  getReceitas(): Observable<Receita[]> {
    return this.http.get<Receita[]>(`${this.baseUrl}`);
  }

  // Método para obter uma receita por ID
  getReceitaById(id: number): Observable<Receita> {
    return this.http.get<Receita>(`${this.baseUrl}/${id}`);
  }

  // Método para criar uma nova receita
  createReceita(receita: Receita): Observable<Receita> {
    return this.http.post<Receita>(this.baseUrl, receita);
  }

  // Método para atualizar uma receita existente
  updateReceita(id: number, receita: Receita): Observable<Receita> {
    return this.http.put<Receita>(`${this.baseUrl}/${id}`, receita);
  }

  // Método para excluir uma receita
  deleteReceita(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
