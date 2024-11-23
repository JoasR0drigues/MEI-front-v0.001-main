import { Component, OnInit } from '@angular/core';
import { ServicoService } from '../servicos/servico.service';
import { Servico } from '../modelo/Servico';
import { Cliente } from '../modelo/Cliente'; // Importe o modelo de Cliente

@Component({
  selector: 'app-servico',
  templateUrl: './servico.component.html',
  styleUrls: ['./servico.component.css'],
})
export class ServicoComponent implements OnInit {
  servicos: Servico[] = [];
  clientes: Cliente[] = []; // Lista de clientes
  novoServico: Servico = this.criarNovoServico();

  constructor(private servicoService: ServicoService) {}

  ngOnInit(): void {
    this.carregarServicos();
    this.carregarClientes(); // Carregar a lista de clientes
  }

  carregarServicos(): void {
    this.servicoService.getAllServicos().subscribe((data) => {
      this.servicos = data;
    });
  }

  carregarClientes(): void {
    this.servicoService.getAllClientes().subscribe((data) => {
      this.clientes = data;
    });
  }

  salvarServico() {
    this.servicoService.cadastrarServico(this.novoServico).subscribe({
      next: (response) => {
        console.log('Serviço salvo com sucesso!', response);
        this.carregarServicos(); // Recarregar a lista de serviços após salvar
        this.novoServico = this.criarNovoServico(); // Limpar o formulário
      },
      error: (error) => {
        console.error('Erro ao salvar serviço:', error);
      },
    });
  }

  editarServico(servico: Servico): void {
    this.novoServico = { ...servico };
  }

  excluirServico(codigo: number): void {
    this.servicoService.deleteServico(codigo).subscribe(() => {
      this.carregarServicos();
    });
  }

  private criarNovoServico(): Servico {
    return {
        codigo: 0,
        tituloServico: '',
        valorServico: 0,
        descricaoServico: '',
        status: '',
        cliente: { nome: '', codigo: 0 }, // Adicione a propriedade codigo
    };
}

}
