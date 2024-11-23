import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ClienteComponent } from './cliente/cliente.component';
import { FornecedorComponent } from './fornecedor/fornecedor.component';
import { AppRoutingModule } from './app-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { AgendasComponent } from './agendas/agendas.component';
import { ServicoComponent } from './servico/servico.component';
import { ContaComponent } from './financas/conta/conta.component';
import { DespesaComponent } from './financas/despesa/despesa.component';
import { TransacaoComponent } from './financas/transacao/transacao.component';
import { ReceitaComponent } from './financas/receita/receita.component';


@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    FornecedorComponent,
    InicioComponent,
    AgendasComponent,
    ServicoComponent,
    ContaComponent,
    DespesaComponent,
    TransacaoComponent,
    ReceitaComponent
   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [provideNgxMask()],
  bootstrap: [AppComponent]
})
export class AppModule { }
