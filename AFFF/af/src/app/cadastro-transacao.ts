import { Component, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { inject } from '@angular/core';
import { TransacaoService } from './transacao'; // Assumindo que o nome do arquivo seja transacao.service.ts

@Component({
  selector: 'app-cadastro-transacao',
  standalone: true, // diretiva ou pipe que funciona sozinho
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastro-transacao.html',
  styleUrls: ['./cadastro-transacao.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CadastroTransacaoComponent {
  private fb = inject(FormBuilder); //FormBuilder serve pra criar formulario
  private service = inject(TransacaoService);

  // Uso da função output()
  transacaoCadastrada = output<void>();

  // Definição do Reactive Form
  form: FormGroup = this.fb.group({
    type: ['', Validators.required], //validar campos de formulários reativos.
    description: ['', Validators.required],
    amount: [null, [Validators.required, Validators.min(0.01)]],
    category: ['', Validators.required],
  });

  onSubmit(): void { // chama o formulario
    if (this.form.valid) {
      const novaTransacao = this.form.value; 
      
      // Loga o que o Angular está enviando
      console.log('JSON que o Angular está enviando:', novaTransacao);

      this.service.cadastrar(novaTransacao).subscribe({
        next: () => {
          this.transacaoCadastrada.emit(); // Notifica o componente pai
          // Limpa o formulário após sucesso
          this.form.reset({ type: '', description: '', amount: null, category: '' }); 
          this.form.markAsPristine();
          this.form.markAsUntouched();
        },
        error: (err) => {
          // Loga o erro, incluindo a mensagem do servidor se disponível
          console.error('Erro ao cadastrar transação:', err);
          if (err.error && err.error.message) {
            console.error('Mensagem de erro do Backend:', err.error.message);
          }
        },
      });
    } else {
        // Se o botão não estivesse desabilitado corretamente, isso mostraria o erro de validação
        console.warn('Formulário inválido, não enviando requisição.', this.form.controls);
    }
  }
}