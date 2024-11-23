import { Component } from '@angular/core';
import { FornecedorService } from '../servicos/fornecedor.service';
import { Fornecedor } from '../modelo/Fornecedor';
import { Router } from '@angular/router';
import { ConsultaCepService } from '../servicos/consulta-cep.service';
import { EnderecoDados } from 'src/Interfaces/EnderecoDados';
import { CnpjDados } from 'src/Interfaces/CnpjDados';
import { ConsultaCnpjService } from '../servicos/consultacnpjservice.service';

@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.css']
})
export class FornecedorComponent {

  fornecedor: Fornecedor = new Fornecedor(); // Inicializando o Fornecedor com endereço
  btnCadastro: boolean = true;
  tabela: boolean = true;
  fornecedores: Fornecedor[] = [];

  constructor(private servico: FornecedorService, private router :Router,
    private consultaCepService: ConsultaCepService,
    private consultaCnpjService: ConsultaCnpjService 
  ) {}

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.buscarPorCNPJ();
    }
  }
  
  retornar() {
    this.router.navigate(['inicio']);
  }

  ngOnInit(): void {
    this.selecionar();
  }

  selecionar(): void {
    this.servico.selecionar()
      .subscribe(retorno => this.fornecedores = retorno, error => {
        console.error('Erro ao carregar fornecedors:', error);
        alert('Erro ao carregar fornecedors.');
      });
  }

  buscarPorCNPJ(): void {
    const cnpj = this.fornecedor.cnpj?.replace(/[^\d]/g, ''); // Remove a máscara do CNPJ
    if (cnpj && cnpj.length === 14) {
      this.servico.buscarPorCNPJ(cnpj).subscribe(
        fornecedor => {
          if (fornecedor) {
            this.fornecedor = fornecedor; // Preenche o formulário com os dados do fornecedor encontrado
            alert('Fornecedor encontrado pelo CNPJ.');
          } else {
            alert('Nenhum fornecedor encontrado com este CNPJ.');
          }
        },
        error => {
          console.error('Erro ao buscar fornecedor por CNPJ:', error);
          alert('Erro ao buscar fornecedor por CNPJ.');
        }
       
      );
    } else {
      alert('CNPJ inválido. Verifique e tente novamente.');
    }
  }
  

  cadastrar(): void {
    this.fornecedor.cnpj = this.fornecedor.cnpj.replace(/\D/g, ''); 
    this.servico.cadastrar(this.fornecedor)
      .subscribe(retorno => {
        this.fornecedores.push(retorno);
        this.fornecedor = new Fornecedor(); // Limpa o formulário, incluindo o endereço
        alert('Fornecedor cadastrado com sucesso');
      }, error => {
        console.error('Erro ao cadastrar fornecedor:', error);
        alert('Erro ao cadastrar fornecedor.');
      });
  }

  selecionarFornecedor(fornecedor: Fornecedor): void {
    this.fornecedor = { ...fornecedor }; // Preenche o formulário com os dados do fornecedor e endereçon
    this.btnCadastro = false; // Muda o estado para edição
    this.tabela = false; // Oculta a tabela
  }

  editar(): void {
    if (this.fornecedor.codigo) { // Verifica se o fornecedor possui um código válido
      this.servico.editar(this.fornecedor.codigo, this.fornecedor)
        .subscribe(retorno => {
          let posicao = this.fornecedores.findIndex(obj => obj.codigo === retorno.codigo);
          if (posicao !== -1) {
            this.fornecedores[posicao] = retorno;
            this.fornecedor = new Fornecedor(); // Limpa o formulário
            this.btnCadastro = true; // Volta ao estado de cadastro
            this.tabela = true; // Mostra a tabela novamente
            alert('Fornecedor alterado com sucesso!');
          } else {
            alert('Fornecedor não encontrado na lista.');
          }
        }, error => {
          console.error('Erro ao editar Fornecedor:', error);
          alert('Erro ao alterar Fornecedor.');
        });
    } else {
      alert('Fornecedor não selecionado ou código inválido.');
    }
  }

  remover(): void {
    if (this.fornecedor.codigo) { // Verifica se o fornecedor possui um código válido
      this.servico.remover(this.fornecedor.codigo)
        .subscribe(retorno => {
          let posicao = this.fornecedores.findIndex(obj => obj.codigo === this.fornecedor.codigo);
          if (posicao !== -1) {
            this.fornecedores.splice(posicao, 1);
            this.fornecedor = new Fornecedor(); // Limpa o formulário
            this.btnCadastro = true; // Volta ao estado de cadastro
            this.tabela = true; // Mostra a tabela novamente
            alert('Fornecedor removido com sucesso!');
          } else {
            alert('Fornecedor não encontrado na lista.');
          }
        }, error => {
          console.error('Erro ao remover fornecedor:', error);
          alert('Erro ao remover fornecedor.');
        });
    } else {
      alert('fornecedor não selecionado ou código inválido.');
    }
  }

  cancelar(): void {
    this.fornecedor = new Fornecedor(); // Limpa o formulário, incluindo o endereço
    this.btnCadastro = true; // Volta ao estado de cadastro
    this.tabela = true;
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
  // Função para alternar a visibilidade dos detalhes
  toggleDetalhes(fornecedor: Fornecedor): void {
    fornecedor.mostrarDetalhes = !fornecedor.mostrarDetalhes;
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
    this.fornecedor.endereco.logradouro = dados.logradouro || '';
    this.fornecedor.endereco.numero = ''; // Ou outro valor padrão
    this.fornecedor.endereco.bairro = dados.bairro || '';
    this.fornecedor.endereco.localidade = dados.localidade || '';
    this.fornecedor.endereco.uf = dados.uf || '';
    this.fornecedor.endereco.cep = dados.cep || '';
  }
  consultaCNPJ(cnpj: string): void {
    // Verifica se o CNPJ tem 14 dígitos
    if (cnpj.length === 14) {
      this.consultaCnpjService.consultaCNPJ(cnpj).subscribe(
        (dados: CnpjDados) => {
          this.populaDadosCnpj(dados); // Preenche os dados da empresa
        },
        (error) => {
          console.error('Erro ao consultar CNPJ:', error);
          alert('Erro ao consultar CNPJ.');
        }
      );
    } else {
      alert('CNPJ inválido.');
    }
  }
  
  // Função para preencher os dados da empresa no formulário
  populaDadosCnpj(dados: CnpjDados): void {
    this.fornecedor.razaoSocial = dados.razao_social || '';
    //this.fornecedor.nomeFantasia = dados.nome_fantasia || '';
    this.fornecedor.endereco.logradouro = dados.logradouro || '';
    this.fornecedor.endereco.numero = dados.numero || '';
    this.fornecedor.endereco.bairro = dados.bairro || '';
    //this.fornecedor.endereco.cidade = dados.municipio || '';
    this.fornecedor.endereco.uf = dados.uf || '';
    this.fornecedor.endereco.cep = dados.cep || '';
    //this.fornecedor.telefone = dados.telefone || '';
    this.fornecedor.email = dados.email || '';
  }
}

