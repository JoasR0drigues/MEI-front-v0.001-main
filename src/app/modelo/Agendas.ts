import { Cliente } from "./Cliente";
import { Endereco } from "./Endereco";
import { EnderecoDados } from "src/Interfaces/EnderecoDados";

export interface Agenda {
  codigo?: number; // Opcional, pois pode não estar presente em uma criação
  titulo_do_servico: string;
  telefone: string;
  email: string;
  observacao?: string; // Opcional
  data_e_hora_inicio: string; // Usamos string para lidar bem com o formato
  data_e_hora_fim: string;
  cliente?: Cliente; // Opcional, pois pode ser nulo
  endereco?: Endereco;
}

// Criar uma instância de novaAgenda fora da interface
export const novaAgenda: Agenda = {
  titulo_do_servico: '',
  telefone: '',
  email: '',
  data_e_hora_inicio: '',
  data_e_hora_fim: '',
  observacao: '',
  endereco: new Endereco() // Garantindo que o endereço esteja inicializado
};


