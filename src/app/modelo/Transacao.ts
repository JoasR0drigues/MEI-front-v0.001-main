import { Conta } from "../modelo/Conta";
import { Despesa } from "../modelo/Despesa"
import { Receita } from "../modelo/Receita"

export class Transacao {
  codigoTransacao!: number;
  date!: Date | 'dd/MM/yyyy HH:mm' ;  
  valor!: number;  
  descricao!: string;
  receita!: Receita | "null";  
  despesa!: Despesa | "null";  
  conta!: Conta;  
}
