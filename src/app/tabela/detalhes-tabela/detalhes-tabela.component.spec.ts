import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesTabelaComponent } from './detalhes-tabela.component';

describe('DetalhesTabelaComponent', () => {
  let component: DetalhesTabelaComponent;
  let fixture: ComponentFixture<DetalhesTabelaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalhesTabelaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhesTabelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
