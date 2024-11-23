import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Endereco } from '../modelo/Endereco';


// Importando a interface para o tipo esperado de dados
import { ClienteComponent } from '../cliente/cliente.component'; 
import { EnderecoDados } from 'src/Interfaces/EnderecoDados';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {
  private baseUrl = 'https://viacep.com.br/ws'; // URL base para consulta de CEP
  

  constructor(private http: HttpClient) {}

  consultaCEP(cep: string): Observable<Endereco> {
    return this.http.get<EnderecoDados>(`${this.baseUrl}/${cep}/json/`);
  }
}
