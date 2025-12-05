// src/app/transacao.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Definição das interfaces
export type TransacaoTipo = 'INCOME' | 'EXPENSE';

//Interface
export interface Transacao {
  descricao: any;
  _id: string; // ID gerado pelo MongoDB
  type: TransacaoTipo;
  description: string;
  amount: number; // quantidade de itens
  category: string; // categoria 
  date: Date; // data
}

@Injectable({
  providedIn: 'root' // providedIn ta servindo para fazermos a injeçao, singleton globalmente acessível. 
})
export class TransacaoService {
  // Uso da função inject() em vez de constructor injection (Angular Best Practice)
  private http = inject(HttpClient); //cria uma variavel http que usa o servirço hhtpClien

private apiUrl = 'http://localhost:3000/api/transacoes'; // variavel com a url dentro
//                                  
  

  /**
   * Registra uma nova transação via POST.
   */
  cadastrar(transacao: Omit<Transacao, '_id' | 'date'>): Observable<Transacao> { //omit nao deixa de id ou data, observable ta esperendao a transacao acontecer
    // A API adiciona o _id e a data.
    return this.http.post<Transacao>(this.apiUrl, transacao);
  }

  /**
   * Obtém a lista completa de transações via GET.
   */
  listar(): Observable<Transacao[]> {
    return this.http.get<Transacao[]>(this.apiUrl);
  }

  /**
   * Obtém o saldo total da API.
   */
  obterSaldo(): Observable<{ balance: number }> { //balance e o resultado entre + e -
    return this.http.get<{ balance: number }>(`${this.apiUrl}/balance`);
  }
}