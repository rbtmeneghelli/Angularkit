import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateTabelaComponent } from './template-tabela.component';

describe('TemplateTabelaComponent', () => {
  let component: TemplateTabelaComponent;
  let fixture: ComponentFixture<TemplateTabelaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateTabelaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateTabelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
