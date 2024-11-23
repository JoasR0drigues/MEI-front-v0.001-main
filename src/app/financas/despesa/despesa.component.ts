import { Component, OnInit } from '@angular/core';
import { DespesaService } from '../../servicos/despesa.service';
import { Despesa } from '../../modelo/Despesa';

@Component({
  selector: 'app-despesa',
  templateUrl: './despesa.component.html',
})
export class DespesaComponent implements OnInit {
  despesas: Despesa[] = []; // Lista de despesas
  novaDespesa: Despesa = new Despesa(); // Nova despesa para criação
  despesaParaEdicao: Despesa | null = null; // Despesa para edição
  tiposDespesa: string[] = ['Produto', 'Servico']; // Opções do enum TipoDespesa

  constructor(private despesaService: DespesaService) {}

  ngOnInit(): void {
    this.carregarDespesas();
  }

  carregarDespesas(): void {
    this.despesaService.getDespesas().subscribe(
      (data) => (this.despesas = data),
      (error) => console.error('Erro ao carregar despesas', error)
    );
  }

  criarDespesa(): void {
    // Validação para garantir que todos os campos estão preenchidos
    if (!this.novaDespesa.data || !this.novaDespesa.valorDespesa || !this.novaDespesa.tipoDespesa) {
      console.error('Todos os campos devem ser preenchidos');
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
  
    // Chamada ao serviço para criar a despesa
    this.despesaService.createDespesa(this.novaDespesa).subscribe(
      (despesa) => {
        this.despesas.push(despesa); // Adiciona a nova despesa à lista
        this.novaDespesa = new Despesa(); // Limpa o formulário
        alert('Despesa criada com sucesso!'); // Mensagem de sucesso
      },
      (error) => {
        console.error('Erro ao criar despesa:', error);
        // Exibe uma mensagem de erro mais específica se possível
        if (error.status === 400) {
          alert('Erro: Dados inválidos. Verifique as informações inseridas.');
        } else if (error.status === 500) {
          alert('Erro: Ocorreu um problema no servidor. Tente novamente mais tarde.');
        } else {
          alert('Erro ao criar despesa. Tente novamente mais tarde.');
        }
      }
    );
  }
  atualizarDespesa(): void {
    if (this.despesaParaEdicao) {
      this.despesaService.updateDespesa(this.despesaParaEdicao.idDespesa, this.despesaParaEdicao).subscribe(
        () => {
          this.carregarDespesas(); // Recarregar a lista de despesas
          this.despesaParaEdicao = null; // Limpar a despesa para edição
        },
        (error) => console.error('Erro ao atualizar despesa', error)
      );
    }
  }

  excluirDespesa(idDespesa: number): void {
    this.despesaService.deleteDespesa(idDespesa).subscribe(
      () => {
        this.despesas = this.despesas.filter(despesa => despesa.idDespesa !== idDespesa); // Remover da lista
      },
      (error) => console.error('Erro ao excluir despesa', error)
    );
  }
}
