import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCabecalhoComponent } from './card-cabecalho.component';

describe('CardCabecalhoComponent', () => {
  let component: CardCabecalhoComponent;
  let fixture: ComponentFixture<CardCabecalhoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardCabecalhoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardCabecalhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
