import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../modelo/Cliente';
import { ClienteComponent } from '../cliente/cliente.component';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  //url da api
  private url:string ='http://localhost:8080/clientes';
  constructor(private http:HttpClient) { }

  //Metodo para selecionar os clientes
  selecionar():Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.url);
  }

  //Metodo para cadastrar clientes
  cadastrar(cliente: Cliente): Observable<any> {
    return this.http.post<any>(this.url, cliente, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text' as 'json'
    });
  }
  // Método para buscar cliente por CPF
  buscarPorCPF(cpf: string): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.url}/cpf/${cpf}`);
  }

  // Método para buscar cliente por CNPJ
  buscarPorCNPJ(cnpj: string): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.url}/cnpj/${cnpj}`);
  }
  
   //Metodo para editar clientes
    editar(id: number, obj: Cliente): Observable<Cliente> {
      return this.http.put<Cliente>(`${this.url}/${id}`, obj);
    }
    remover(id:number):Observable<void>{
      return this.http.delete<void>(this.url + '/'+id);

    }

    buscarPorIdentificacao(identificacao: string) {
      return this.http.get<Cliente>(`/api/clientes/identificacao/${identificacao}`);
    }
    
}
