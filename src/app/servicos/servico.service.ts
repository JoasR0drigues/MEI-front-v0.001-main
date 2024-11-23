import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Servico } from '../modelo/Servico';

@Injectable({
  providedIn: 'root',
})
export class ServicoService {
  private Url: string = 'http://localhost:8080/servicos';

  constructor(private http: HttpClient) {}

  getAllServicos(): Observable<Servico[]> {
    return this.http.get<Servico[]>(this.Url);
  }

  getServicoById(codigo: number): Observable<Servico> {
    return this.http.get<Servico>(`${this.Url}/${codigo}`);
  }

  cadastrarServico(obj: Servico): Observable<Servico> {
    return this.http.post<Servico>(this.Url, obj);
  }

  updateServico(codigo: number, servico: Servico): Observable<Servico> {
    return this.http.put<Servico>(`${this.Url}/${codigo}`, servico);
  }

  deleteServico(codigo: number): Observable<void> {
    return this.http.delete<void>(`${this.Url}/${codigo}`);
  }

  getAllClientes(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/clientes'); // Ajuste a URL se necessário
  }
}
