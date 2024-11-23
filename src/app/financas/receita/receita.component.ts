import { Component, OnInit } from '@angular/core';
import { Receita } from '../../modelo/Receita';
import { ReceitaService } from '../../servicos/receita.service';


@Component({
  selector: 'app-receita',
  templateUrl: './receita.component.html',
  styleUrls: ['./receita.component.css']
})
export class ReceitaComponent implements OnInit {
    selecionarReceita(arg0: number) {
        throw new Error('Method not implemented.');
    }
  receitas: Receita[] = []; // Lista de receitas
  novaReceita: Receita = new Receita(); // Nova receita para criação
  receitaParaEdicao: Receita | null = null; // Receita para edição
  receita: any;

  constructor(private receitaService: ReceitaService) {}

  ngOnInit(): void {
    this.carregarReceitas();
  }

  carregarReceitas(): void {
    this.receitaService.getReceitas().subscribe(
      (data) => this.receitas = data,
      (error) => console.error('Erro ao carregar receitas', error)
    );
  }

  criarReceita(): void {
    this.receitaService.createReceita(this.novaReceita).subscribe(
      (receita) => {
        this.receitas.push(receita);
        this.novaReceita = new Receita(); // Limpar o formulário
      },
      (error) => console.error('Erro ao criar receita', error)
    );
  }

  editarReceita(receita: Receita): void {
    this.receitaParaEdicao = { ...receita }; // Copiar os dados da receita para edição
  }

  atualizarReceita(): void {
    if (this.receitaParaEdicao) {
      this.receitaService.updateReceita(this.receitaParaEdicao.idReceita, this.receitaParaEdicao).subscribe(
        () => {
          this.carregarReceitas(); // Recarregar a lista de receitas
          this.receitaParaEdicao = null; // Limpar a receita para edição
        },
        (error) => console.error('Erro ao atualizar receita', error)
      );
    }
  }

  excluirReceita(idReceita: number): void {
    this.receitaService.deleteReceita(idReceita).subscribe(
      () => {
        this.receitas = this.receitas.filter(receita => receita.idReceita !== idReceita); // Remover da lista
      },
      (error) => console.error('Erro ao excluir receita', error)
    );
  }
}
