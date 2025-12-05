// src/app/app.spec.ts

// 1. Corrija o nome da classe importada (AppComponent) e o arquivo de importação.
import { AppComponent } from './app'; 
import { TestBed } from '@angular/core/testing'; 
import { provideHttpClient } from '@angular/common/http'; 
import { provideHttpClientTesting } from '@angular/common/http/testing'; // Simula chamadas HTTP


describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // 2. Importe o componente standalone diretamente.
      imports: [AppComponent], 
      
      // 3. Provedores necessários para o serviço de transação.
      providers: [
        provideHttpClient(),
        provideHttpClientTesting() 
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    // 4. Use AppComponent para criar o componente.
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Verifica o título conforme seu HTML: "💸 Controle Financeiro Pessoal"
    expect(compiled.querySelector('h1')?.textContent).toContain('Controle Financeiro Pessoal');
  });
});