export enum TipoConta {
    CORRENTE = 'CORRENTE',
    POUPANCA = 'POUPANCA'
  }
  
  export class Conta {
    numeroConta!: number;    // Mapeia o campo 'numeroConta' do back-end
    agencia!: number;        // Mapeia o campo 'agencia'
    saldo!: number;          // Mapeia o campo 'saldo' (BigDecimal no back-end, number no front-end)
    tipoConta!: TipoConta;   // Enum para 'tipoConta', mapeando Tipo_Conta no back-end
  }