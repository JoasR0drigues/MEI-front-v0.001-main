import { Component } from '@angular/core';

@Component({
  selector: 'app-transacao',
  templateUrl: './transacao.component.html',
  styleUrls: ['./transacao.component.css']
})
export class TransacaoComponent {
  transacao = {
    codigoTransacao: 0,
    date: '',
    valor: 0,
    descricao: '',
    conta: '',
    receita: true, // true para receita, false para despesa
  };

  transacoes: any[] = [];

  adicionarReceita() {
    this.transacao.receita = true;
    this.cadastrarTransacao();
  }

  adicionarDespesa() {
    this.transacao.receita = false;
    this.cadastrarTransacao();
  }

  cadastrarTransacao() {
    this.transacoes.push({ ...this.transacao });
    this.transacao = {
      codigoTransacao: 0,
      date: '',
      valor: 0,
      descricao: '',
      conta: '',
      receita: true,
    };
  }

  deletarTransacao(index: number) {
    this.transacoes.splice(index, 1);
  }

  editarTransacao(index: number) {
    this.transacao = { ...this.transacoes[index] };
  }
}
