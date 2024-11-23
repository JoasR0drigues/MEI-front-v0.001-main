import { Component, OnInit } from '@angular/core';
import { ContaService } from '../../servicos/conta.service'
import { Conta } from '../../modelo/Conta'


@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.css']
})
export class ContaComponent implements OnInit {
gerarPDF(_t39: Conta) {
throw new Error('Method not implemented.');
}
conta: any;
mensagemErro: any;
cadastroConta() {
throw new Error('Method not implemented.');
}
atualizeConta(arg0: any) {
throw new Error('Method not implemented.');
}
selecionarConta(_t35: any) {
throw new Error('Method not implemented.');
}
deletarConta(_t35: any) {
throw new Error('Method not implemented.');
}
onSubmit() {
throw new Error('Method not implemented.');
}
  contas: Conta[] = [];
  novaConta: Conta = new Conta();
  contaParaEdicao: Conta | null = null;

  constructor(private contaService: ContaService) {}

  ngOnInit(): void {
    this.carregarContas();
  }

  carregarContas(): void {
    this.contaService.getContas().subscribe(
      data => this.contas = data,
      error => console.error('Erro ao carregar contas', error)
    );
  }

  criarConta(): void {
    this.contaService.createConta(this.novaConta).subscribe(
      conta => {
        this.contas.push(conta);
        this.novaConta = new Conta(); // Limpar formulário
      },
      error => console.error('Erro ao criar conta', error)
    );
  }

  editarConta(conta: Conta): void {
    this.contaParaEdicao = { ...conta }; // Copiar os dados da conta para edição
  }

  atualizarConta(): void {
    if (this.contaParaEdicao) {
      this.contaService.updateConta(this.contaParaEdicao.numeroConta, this.contaParaEdicao).subscribe(
        () => {
          this.carregarContas();
          this.contaParaEdicao = null; // Limpar edição
        },
        error => console.error('Erro ao atualizar conta', error)
      );
    }
  }

  excluirConta(numeroConta: number): void {
    this.contaService.deleteConta(numeroConta).subscribe(
      () => {
        this.contas = this.contas.filter(conta => conta.numeroConta !== numeroConta); // Remover da lista
      },
      error => console.error('Erro ao excluir conta', error)
    );
  }
}
