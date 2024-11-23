import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transacao } from '../modelo/Transacao';

@Injectable({
  providedIn: 'root'
})
export class TransacaoService {
  removerTransacao(codigoTransacao: number) {
    throw new Error('Method not implemented.');
  }
  responseTransacoes() {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:8080/Transacao';

  // Headers para JSON
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  // Método para buscar todas as transações
  getTransacoes(): Observable<Transacao[]> {
    return this.http.get<Transacao[]>(`${this.apiUrl}`);
  }

  // Método para buscar uma transação pelo ID
  getTransacaoById(id: number): Observable<Transacao> {
    return this.http.get<Transacao>(`${this.apiUrl}/${id}`);
  }

  // Método para cadastrar uma nova transação
  cadastrarTransacao(transacao: Transacao): Observable<Transacao> {
    return this.http.post<Transacao>(this.apiUrl, transacao, this.httpOptions);
  }

  // Método para atualizar uma transação existente
  atualizarTransacao(transacao: Transacao): Observable<Transacao> {
    return this.http.put<Transacao>(`${this.apiUrl}/${transacao.codigoTransacao}`, transacao, this.httpOptions);
  }

  // Método para deletar uma transação pelo ID
  deletarTransacao(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.httpOptions);
  }
}
