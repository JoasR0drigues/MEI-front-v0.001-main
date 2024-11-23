import { Component } from '@angular/core';
import { Cliente } from '../modelo/Cliente';
import { ClienteService } from '../servicos/cliente.service';
import { Router } from '@angular/router';
import { ConsultaCepService } from '../servicos/consulta-cep.service';
import { EnderecoDados } from 'src/Interfaces/EnderecoDados';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent {
  cliente: Cliente = new Cliente(); 
  btnCadastro: boolean = true;
  tabela: boolean = true;
  clientes: Cliente[] = [];
  tipoIdentificacao: string = 'cpf'; 

  constructor(private servico: ClienteService, private router: Router,
    private consultaCepService: ConsultaCepService
  ) { }

  ngOnInit(): void {
    this.selecionar();
  }

  // Função chamada ao pressionar qualquer tecla
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      if (this.tipoIdentificacao === 'cpf') {
        this.buscarPorCPF();
      } else if (this.tipoIdentificacao === 'cnpj') {
        this.buscarPorCNPJ();
      }
    }
  }

  // Função para buscar cliente por CPF
  buscarPorCPF(): void {
    const cpf = this.cliente.cpf?.replace(/[^\d]/g, ''); // Remove a máscara do CPF
    if (cpf && cpf.length === 11) {
      this.servico.buscarPorCPF(cpf).subscribe(
        cliente => {
          if (cliente) {
            this.cliente = cliente; // Preenche o formulário com os dados do cliente encontrado
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

  // Função para buscar cliente por CNPJ
  buscarPorCNPJ(): void {
    const cnpj = this.cliente.cnpj?.replace(/[^\d]/g, ''); // Remove a máscara do CNPJ
    if (cnpj && cnpj.length === 14) {
      this.servico.buscarPorCNPJ(cnpj).subscribe(
        cliente => {
          if (cliente) {
            this.cliente = cliente; // Preenche o formulário com os dados do cliente encontrado
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



  retornar() {
    this.router.navigate(['inicio']);
  }

  selecionar(): void {
    this.servico.selecionar()
      .subscribe(retorno => this.clientes = retorno, error => {
        console.error('Erro ao carregar clientes:', error);
        alert('Erro ao carregar clientes.');
      });
  }

  cadastrar(): void {
    if (this.cliente.cpf) {
      this.cliente.cpf = this.cliente.cpf.replace(/[^\d]/g, ''); // Remove pontos e traços do CPF
    }

    if (this.cliente.cnpj) {
      this.cliente.cnpj = this.cliente.cnpj.replace(/[^\d]/g, ''); // Remove pontos, traços e barras do CNPJ
    }

    // Verifique se tipoIdentificacao é definido
    if (this.tipoIdentificacao === 'cpf') {
      // Verifique se cpf está definido e é válido
      if (this.cliente.cpf && !this.isValidCPF(this.cliente.cpf)) {
        alert('O CPF informado é inválido.');
        return;
      }
    }

    if (this.tipoIdentificacao === 'cnpj') {
      // Verifique se cnpj está definido e é válido
      if (this.cliente.cnpj && !this.isValidCNPJ(this.cliente.cnpj)) {
        alert('O CNPJ informado é inválido.');
        return;
      }
    }

    console.log('Cliente a ser cadastrado:', this.cliente); // Verifique a estrutura dos dados enviados

    this.servico.cadastrar(this.cliente)
      .subscribe(
        retorno => {
          console.log('Resposta do servidor:', retorno);
          alert(retorno);
          this.clientes.push(this.cliente);
          this.cliente = new Cliente();
          this.btnCadastro = true;
          this.tabela = true;
        },
        error => {
          console.error('Erro ao cadastrar cliente:', error);
          alert(`Erro ao cadastrar cliente: ${error.message}`);
          console.error('Erro completo:', error);
        }
      );
  }

  // Método para validar CPF (exemplo básico, ajuste conforme necessário)
  isValidCPF(cpf: string): boolean {
    // Adicione a lógica de validação do CPF aqui
    return true; // Retorne true se válido e false se inválido
  }

  // Método para validar CNPJ (exemplo básico, ajuste conforme necessário)
  isValidCNPJ(cnpj: string): boolean {
    // Adicione a lógica de validação do CNPJ aqui
    return true; // Retorne true se válido e false se inválido
  }


  selecionarCliente(cliente: Cliente): void {
    this.cliente = { ...cliente }; // Preenche o formulário com os dados do cliente e endereçon
    this.btnCadastro = false; // Muda o estado para edição
    this.tabela = false; // Oculta a tabela
  }

  editar(): void {
    if (this.cliente.codigo) { // Verifica se o cliente possui um código válido
      this.servico.editar(this.cliente.codigo, this.cliente)
        .subscribe(retorno => {
          let posicao = this.clientes.findIndex(obj => obj.codigo === retorno.codigo);
          if (posicao !== -1) {
            this.clientes[posicao] = retorno;
            this.cliente = new Cliente(); // Limpa o formulário
            this.btnCadastro = true; // Volta ao estado de cadastro
            this.tabela = true; // Mostra a tabela novamente
            alert('Cliente alterado com sucesso!');
          } else {
            alert('Cliente não encontrado na lista.');
          }
        }, error => {
          console.error('Erro ao editar cliente:', error);
          alert('Erro ao alterar cliente.');
        });
    } else {
      alert('Cliente não selecionado ou código inválido.');
    }
  }

  remover(): void {
    if (this.cliente.codigo) { // Verifica se o cliente possui um código válido
      this.servico.remover(this.cliente.codigo)
        .subscribe(retorno => {
          let posicao = this.clientes.findIndex(obj => obj.codigo === this.cliente.codigo);
          if (posicao !== -1) {
            this.clientes.splice(posicao, 1);
            this.cliente = new Cliente(); // Limpa o formulário
            this.btnCadastro = true; // Volta ao estado de cadastro
            this.tabela = true; // Mostra a tabela novamente
            alert('Cliente removido com sucesso!');
          } else {
            alert('Cliente não encontrado na lista.');
          }
        }, error => {
          console.error('Erro ao remover cliente:', error);
          alert('Erro ao remover cliente.');
        });
    } else {
      alert('Cliente não selecionado ou código inválido.');
    }
  }

  cancelar(): void {
    this.cliente = new Cliente(); // Limpa o formulário, incluindo o endereço
    this.btnCadastro = true; // Volta ao estado de cadastro
    this.tabela = true;
  }

  aplicarMascaraCPF(event: Event): void {
    const input = event.target as HTMLInputElement;
    let v = input.value;

    // Remove todos os caracteres não numéricos
    v = v.replace(/\D/g, '');

    // Adiciona a máscara
    if (v.length <= 11) {
      v = v.replace(/(\d{3})(\d{3})?(\d{3})?(\d{2})?/, (match, p1, p2, p3, p4) => {
        return `${p1}${p2 ? '.' + p2 : ''}${p3 ? '.' + p3 : ''}${p4 ? '-' + p4 : ''}`;
      });
    }

    input.value = v;
  }

  aplicarMascaraCNPJ(event: Event): void {
    const input = event.target as HTMLInputElement;
    let v = input.value;

    // Remove todos os caracteres não numéricos
    v = v.replace(/\D/g, '');

    // Adiciona a máscara
    if (v.length <= 14) {
      // Adiciona a máscara ao CNPJ
      v = v.replace(/^(\d{2})(\d{3})?(\d{3})?(\d{4})?$/, (match, p1, p2, p3, p4) => {
        let result = `${p1}`;
        if (p2) result += `.${p2}`;
        if (p3) result += `.${p3}`;
        if (p4) result += `/${p4}`;
        if (v.length > 12) result += `-${v.slice(12, 14)}`; // Adiciona o hífen ao final
        return result;
      });
    } else {
      // Limita a 18 caracteres
      v = v.slice(0, 14); // Mantém apenas os primeiros 14 dígitos
      v = v.replace(/^(\d{2})(\d{3})?(\d{3})?(\d{4})?$/, (match, p1, p2, p3, p4) => {
        let result = `${p1}`;
        if (p2) result += `.${p2}`;
        if (p3) result += `.${p3}`;
        if (p4) result += `/${p4}`;
        if (v.length > 12) result += `-${v.slice(12, 14)}`; // Adiciona o hífen ao final
        return result;
      });
    }

    // Atualiza o valor do input com a máscara aplicada
    input.value = v;
  }





  // Novo método para gerenciar a seleção entre CPF e CNPJ
  onTipoIdentificacaoChange(tipo: string): void {
    this.tipoIdentificacao = tipo;
    if (tipo === 'cpf') {
      this.cliente.cnpj = '';
    } else if (tipo === 'cnpj') {
      this.cliente.cpf = '';
    }
  }
  // Função para alternar a visibilidade dos detalhes
  toggleDetalhes(cliente: Cliente): void {
    cliente.mostrarDetalhes = !cliente.mostrarDetalhes;
  }
  toUpperCase(event: any) {
    event.target.value = event.target.value.toUpperCase();
  }




  consultaCEP(cep: string): void {
    if (cep.length === 8) {
      this.consultaCepService.consultaCEP(cep).subscribe(
        (dados: EnderecoDados) => {
          this.populaDadosEndereco(dados);
        },
        (error) => {
          console.error('Erro ao consultar CEP:', error);
          alert('Erro ao consultar CEP.');
        }
      );
    } else {
      alert('CEP inválido.');
    }
  }

  // Função para preencher os dados do endereço
  populaDadosEndereco(dados: EnderecoDados): void {
    this.cliente.endereco.logradouro = dados.logradouro || '';
    this.cliente.endereco.numero = ''; // Ou outro valor padrão
    this.cliente.endereco.bairro = dados.bairro || '';
    this.cliente.endereco.localidade = dados.localidade || '';
    this.cliente.endereco.uf = dados.uf || '';
    this.cliente.endereco.cep = dados.cep || '';
  }
}
