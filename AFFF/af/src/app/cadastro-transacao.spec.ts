import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroTransacao } from './cadastro-transacao';

describe('CadastroTransacao', () => {
  let component: CadastroTransacao;
  let fixture: ComponentFixture<CadastroTransacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroTransacao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroTransacao);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});