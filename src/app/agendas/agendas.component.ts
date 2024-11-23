import { Component, OnInit } from '@angular/core';

import { Agenda } from '../modelo/Agendas';
import { ClienteService } from '../servicos/cliente.service';
import { Cliente } from '../modelo/Cliente';
import { Endereco } from '../modelo/Endereco';
import { jsPDF } from 'jspdf';
import { AgendaService } from '../agendas.service';


@Component({
  selector: 'app-agendas',
  templateUrl: './agendas.component.html',
  styleUrls: ['./agendas.component.css']
})
export class AgendasComponent implements OnInit {
  
  cliente: Cliente = {
    nome: '',
    telefoneResidencial: '',
    email: '',
    endereco: {
      logradouro: '',
      numero: '',
      bairro: '',
      localidade: '',
      uf: '',
      cep: '',
      complemento: '', // Adicione complemento se necessário
      codigo: 0 // Adicione código se necessário
    }
  };
  
  agendas: Agenda[] = [];
  
  novaAgenda: Agenda = {
    titulo_do_servico: '',
    telefone: '',
    email: '',
    data_e_hora_inicio: '',
    data_e_hora_fim: '',
    observacao: '',
    endereco: new Endereco() // Inicializando endereco
  };
 
  mensagemErro = '';

  constructor(private agendaService: AgendaService, private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.carregarAgendas();
  }

  carregarAgendas(): void {
    this.agendaService.getAllAgendas().subscribe(
      (agendas: Agenda[]) => {
        this.agendas = agendas;
      },
      (error: any) => {
        console.error('Erro ao carregar agendas:', error);
        this.mensagemErro = 'Erro ao carregar agendas.';
      }
    );
  }

  // Método para buscar cliente por CPF
  buscarClientePorCPF(cpf: string): void {
    const cpfLimpo = cpf.replace(/[^\d]/g, ''); // Remove a máscara do CPF
    if (cpfLimpo && cpfLimpo.length === 11) {
      this.clienteService.buscarPorCPF(cpfLimpo).subscribe(
        cliente => {
          if (cliente) {
            this.cliente = cliente; // Preenche o cliente encontrado
            this.preencherDadosAgenda();
            alert('Cliente encontrado pelo CPF.');
          } else {
            alert('Nenhum cliente encontrado com este CPF.');
          }
        },
        error => {
          console.error('Erro ao buscar cliente por CPF:', error);
          alert('Erro ao buscar cliente por CPF.');
        }
      );
    } else {
      alert('CPF inválido. Verifique e tente novamente.');
    }
  }

  // Método para buscar cliente por CNPJ
  buscarClientePorCNPJ(cnpj: string): void {
    const cnpjLimpo = cnpj.replace(/[^\d]/g, ''); // Remove a máscara do CNPJ
    if (cnpjLimpo && cnpjLimpo.length === 14) {
      this.clienteService.buscarPorCNPJ(cnpjLimpo).subscribe(
        cliente => {
          if (cliente) {
            this.cliente = cliente; // Preenche o cliente encontrado
            this.preencherDadosAgenda();
            alert('Cliente encontrado pelo CNPJ.');
          } else {
            alert('Nenhum cliente encontrado com este CNPJ.');
          }
        },
        error => {
          console.error('Erro ao buscar cliente por CNPJ:', error);
          alert('Erro ao buscar cliente por CNPJ.');
        }
      );
    } else {
      alert('CNPJ inválido. Verifique e tente novamente.');
    }
  }

  // Método para preencher os dados da agenda com as informações do cliente
  preencherDadosAgenda(): void {
    this.novaAgenda.telefone = this.cliente.telefoneResidencial ?? '';
    this.novaAgenda.email = this.cliente.email ?? '';
    
    // Preenche o endereço se existir
    if (this.cliente.endereco) {
      this.novaAgenda.endereco = {
        logradouro: this.cliente.endereco.logradouro ?? '',
        numero: this.cliente.endereco.numero ?? '',
        bairro: this.cliente.endereco.bairro ?? '',
        localidade: this.cliente.endereco.localidade ?? '',
        uf: this.cliente.endereco.uf ?? '',
        cep: this.cliente.endereco.cep ?? '',
        complemento: this.cliente.endereco.complemento ?? '',
        codigo: this.cliente.endereco.codigo ?? 0
      };
    }
  }

  criarAgenda(): void {
    // Chamando o serviço para criar a agenda
    this.agendaService.createAgenda(this.novaAgenda).subscribe(
      (response: any) => {
        console.log('Agenda criada com sucesso:', response);
        this.carregarAgendas(); // Atualiza a lista

        // Reinicializa novaAgenda com todos os campos, incluindo o endereço
        this.novaAgenda = {
          titulo_do_servico: '',
          telefone: '',
          email: '',
          data_e_hora_inicio: '',
          data_e_hora_fim: '',
          observacao: '',
          endereco: new Endereco() // Reinicializa o endereço
        };

        this.cliente = new Cliente(); // Limpa o cliente após criar a agenda
      },
      (error: any) => {
        console.error('Erro ao criar agenda:', error);
        this.mensagemErro = 'Erro ao criar agenda.';
      }
    );
  }
  

gerarPDF(agenda: any) {
  const doc = new jsPDF();

  doc.setFont("Helvetica", "normal");
  doc.setFontSize(12);

  // Adiciona título e dados da agenda
  doc.text('Detalhes da Agenda', 10, 10);
  doc.text(`Título do Serviço: ${agenda.titulo_do_servico}`, 10, 20);
  doc.text(`Início: ${new Date(agenda.data_e_hora_inicio).toLocaleString()}`, 10, 30);
  doc.text(`Fim: ${new Date(agenda.data_e_hora_fim).toLocaleString()}`, 10, 40);
  doc.text(`Telefone: ${agenda.telefone}`, 10, 50);
  doc.text(`Email: ${agenda.email}`, 10, 60);
  doc.text(`Observação: ${agenda.observacao}`, 10, 70);

  // Adiciona endereço, se disponível
  if (agenda.endereco) {
    doc.text('Endereço:', 10, 80);
    doc.text(`Logradouro: ${agenda.endereco.logradouro || 'Não informado'}`, 10, 90);
    doc.text(`Número: ${agenda.endereco.numero || 'Não informado'}`, 10, 100);
    doc.text(`Bairro: ${agenda.endereco.bairro || 'Não informado'}`, 10, 110);
    doc.text(`Localidade: ${agenda.endereco.localidade || 'Não informado'}`, 10, 120);
    doc.text(`UF: ${agenda.endereco.uf || 'Não informado'}`, 10, 130);
    doc.text(`CEP: ${agenda.endereco.cep || 'Não informado'}`, 10, 140);
    doc.text(`Complemento: ${agenda.endereco.complemento || 'Não informado'}`, 10, 150);
  }

  // Salva o PDF
  doc.save(`Agenda_${agenda.titulo_do_servico}.pdf`);
}

}
