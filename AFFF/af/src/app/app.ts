// src/app/app.component.ts
import { Component, signal, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common'; 
import { inject } from '@angular/core';

// Importa os componentes e serviço gerados (standalone)
import { CadastroTransacaoComponent } from './cadastro-transacao';
import { ListaTransacaoComponent } from './lista-transacao';
import { TransacaoService, Transacao } from './transacao';

@Component({
  selector: 'app-root',
  // standalone: true é o default
  imports: [
    CommonModule, 
    CadastroTransacaoComponent, 
    ListaTransacaoComponent,
    CurrencyPipe 
  ], 
  // APONTANDO PARA ARQUIVOS EXTERNOS
  templateUrl: './app.html', 
  styleUrls: ['./app.css'],
  
  changeDetection: ChangeDetectionStrategy.OnPush, // Angular Best Practice
})
export class AppComponent implements OnInit {
  private service = inject(TransacaoService);

  // Estado da aplicação com Signals
  transacoes = signal<Transacao[]>([]);
  saldo = signal<number>(0); 
  
  ngOnInit(): void {
    this.carregarDados();
  }

  /**
   * Recarrega a lista de transações e o saldo após um evento (ex: cadastro).
   */
  carregarDados(): void {
    // Lista as transações
    this.service.listar().subscribe({
      next: (data) => this.transacoes.set(data), 
      error: (err) => console.error('Erro ao listar transações:', err)
    });
    
    // Calcula o saldo
    this.service.obterSaldo().subscribe({
      next: (res) => this.saldo.set(res.balance), 
      error: (err) => console.error('Erro ao calcular saldo:', err)
    });
  }
}