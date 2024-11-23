import { Component, OnInit } from '@angular/core';
import { TransacaoService } from '../../servicos/transacao.service';
import { Transacao } from '../../modelo/Transacao';

@Component({
  selector: 'app-transacao',
  templateUrl: './transacao.component.html',
  styleUrls: ['./transacao.component.css']
})
export class TransacaoComponent implements OnInit {
atualizeTransacao(arg0: Transacao) {
throw new Error('Method not implemented.');
}
cadastrarTransacao(): void {
  this.transacaoService.cadastrarTransacao(this.transacao).subscribe(
    (novaTransacao) => {
      this.transacoes.push(novaTransacao); // Adiciona a nova transação à lista
      this.transacao = new Transacao(); // Limpa o formulário para uma nova entrada
    },
    
  );
}

deletarTransacao(arg0: number) {
throw new Error('Method not implemented.');
}
  transacoes: Transacao[] = [];
  transacao = {} as Transacao;

  constructor(private transacaoService: TransacaoService) {}

  ngOnInit(): void {
    this.carregarTransacoes();
  }

  carregarTransacoes(): void {
    this.transacaoService.getTransacoes().subscribe(
      (data) => (this.transacoes = data),
      (error) => console.error('Erro ao carregar transações', error)
    );
  }

  adicionarTransacao(): void {
    this.transacaoService.cadastrarTransacao(this.transacao).subscribe(
      (novaTransacao) => {
        this.transacoes.push(novaTransacao);
        this.transacao = {} as Transacao;
      },
      (error) => console.error('Erro ao adicionar transação', error)
    );
  }

  atualizarTransacao(): void {
    if (this.transacao.codigoTransacao) {
      this.transacaoService.atualizarTransacao(this.transacao).subscribe(
        (transacaoAtualizada) => {
          const index = this.transacoes.findIndex(t => t.codigoTransacao === transacaoAtualizada.codigoTransacao);
          if (index !== -1) this.transacoes[index] = transacaoAtualizada;
        },
        (error) => console.error('Erro ao atualizar transação', error)
      );
    }
  }

  removerTransacao(id: number): void {
    this.transacaoService.deletarTransacao(id).subscribe(
      () => this.transacoes = this.transacoes.filter(t => t.codigoTransacao !== id),
      (error) => console.error('Erro ao remover transação', error)
    );
  }
}
