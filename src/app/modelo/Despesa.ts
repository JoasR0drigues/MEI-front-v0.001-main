import { TipoDespesa } from '../modelo/tipo-despesa'; // Criar um enum similar ao do backend

export class Despesa {
    data(data: any) {
        throw new Error("Method not implemented.");
    }
    id(id: any) {
        throw new Error("Method not implemented.");
    }
  idDespesa!: number;
  date!: Date | 'dd/MM/yyyy HH:mm' ; 
  valorDespesa!: number;
  tipoDespesa!: 'Produto' | 'Servico';
  valor: number | undefined;
}
