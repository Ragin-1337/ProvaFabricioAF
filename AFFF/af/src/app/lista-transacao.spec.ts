import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTransacoes } from './lista-transacoes';

describe('ListaTransacoes', () => {
  let component: ListaTransacoes;
  let fixture: ComponentFixture<ListaTransacoes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaTransacoes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaTransacoes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});