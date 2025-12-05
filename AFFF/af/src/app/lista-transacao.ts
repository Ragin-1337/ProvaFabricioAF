import { Component, input, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Transacao } from './transacao'; // Importa os tipos

@Component({
 selector: 'app-lista-transacao',
 imports: [CommonModule],
 // APONTANDO PARA ARQUIVOS EXTERNOS
 templateUrl: './lista-transacao.html',
 styleUrls: ['./lista-transacao.css'],
 
 // Host bindings no objeto host (sao praticas de acessibildade)
 host: {
  'role': 'region',
  'aria-label': 'Lista de Movimentações Financeiras',
 },
 changeDetection: ChangeDetectionStrategy.OnPush, //sserve pare perceber quando foi pressionado
})
export class ListaTransacaoComponent {
 // Uso da função input()
 transacoes = input.required<Transacao[]>(); //required so pode ser aceito se receber oque foi pedido
 
 // Signal para o estado local do filtro
 filterText = signal('');

 // Uso da função computed() para estado derivado (filtragem)
 transacoesFiltradas = computed(() => {
  const text = this.filterText().toLowerCase();
  
  return this.transacoes().filter(tx =>     
    tx.category.toLowerCase().includes(text) || 
    tx.descricao.toLowerCase().includes(text)
    );
  });

    
}