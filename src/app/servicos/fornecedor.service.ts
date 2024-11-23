import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fornecedor } from '../modelo/Fornecedor';
@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  //url da api
  private url:string ='http://localhost:8080/fornecedores';
  constructor(private http:HttpClient) { }

  //Metodo para selecionar os Fornecedors
  selecionar():Observable<Fornecedor[]>{
    return this.http.get<Fornecedor[]>(this.url);
  }

  //Metodo para cadastrar Fornecedors
  cadastrar(obj:Fornecedor):Observable<Fornecedor>{
    return this.http.post<Fornecedor>(this.url,obj)
  }


   //Metodo para editar Fornecedors
    editar(id: number, obj: Fornecedor): Observable<Fornecedor> {
      return this.http.put<Fornecedor>(`${this.url}/${id}`, obj);
    }
    remover(id:number):Observable<void>{
      return this.http.delete<void>(this.url + '/'+id);

    }

    // Método para buscar cliente por CNPJ
  buscarPorCNPJ(cnpj: string): Observable<Fornecedor> {
    return this.http.get<Fornecedor>(`${this.url}/cnpj/${cnpj}`);
  }
}
