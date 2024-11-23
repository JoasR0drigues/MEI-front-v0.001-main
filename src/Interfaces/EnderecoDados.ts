// Definição da interface para os dados do CEP
export interface EnderecoDados {
    codigo:number;
    logradouro: string;
    numero: string;
    bairro: string;
    localidade: string;
    uf: string;
    cep: string;
    complemento: string;
  }