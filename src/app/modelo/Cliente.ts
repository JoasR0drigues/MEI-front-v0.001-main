import { Endereco } from "./Endereco";
export class Cliente {
    codigo?: number;
    nome: string = '';
    sexo?: string;
    cpf?: string;
    cnpj?: string;
    telefoneResidencial?: string;
    telefoneComercial?: string;
    telefoneCelular?: string;
    email?: string;
    
    endereco: {
      codigo?:number;
      logradouro?: string;
      numero?: string;
      bairro?: string;
      localidade?: string;
      uf?: string;
      cep?: string;
      complemento?:string;
    } = {};
    mostrarDetalhes?: boolean; // Adicionado para controlar a visibilidade dos detalhes
  }
  