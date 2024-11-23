import { Endereco } from "./Endereco";

export class Fornecedor{
     
    codigo: number=0;
    razaoSocial:String  = "";
    cnpj:string  = "";
    telefone1:String = "";
    telefone2:String  = "";
    nomeContato:String = "";
    email:String  = "";
    endereco: {
        logradouro?: string;
        numero?: string;
        bairro?: string;
        localidade?: string;
        uf?: string;
        cep?: string;
      } = {};
      mostrarDetalhes: boolean = false; // Adicionado para controlar a visibilidade dos detalhes
      
    }
