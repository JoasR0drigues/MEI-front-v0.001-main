import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AgendasComponent } from './agendas/agendas.component';
import { Agenda } from './modelo/Agendas';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  private apiUrl = 'http://localhost:8080/agendas'; // URL da API backend

  constructor(private http: HttpClient) {}

  // Método para buscar todas as agendas
  getAllAgendas(): Observable<Agenda[]> {
    return this.http.get<Agenda[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Erro ao buscar agendas', error);
        return throwError(error);
      })
    );
  }

  // Método para criar uma nova agenda
  createAgenda(agenda: Agenda): Observable<Agenda> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Agenda>(this.apiUrl, agenda, { headers }).pipe(
      catchError(error => {
        console.error('Erro ao criar agenda', error);
        return throwError(error);
      })
    );
  }

  // Método para buscar uma agenda por ID
  getAgendaById(id: number): Observable<Agenda> {
    return this.http.get<Agenda>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`Erro ao buscar agenda com ID ${id}`, error);
        return throwError(error);
      })
    );
  }

  // Método para atualizar uma agenda
  updateAgenda(id: number, agenda: Agenda): Observable<Agenda> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Agenda>(`${this.apiUrl}/${id}`, agenda, { headers }).pipe(
      catchError(error => {
        console.error(`Erro ao atualizar agenda com ID ${id}`, error);
        return throwError(error);
      })
    );
  }

  // Método para deletar uma agenda
  deleteAgenda(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`Erro ao deletar agenda com ID ${id}`, error);
        return throwError(error);
      })
    );
  }
}
