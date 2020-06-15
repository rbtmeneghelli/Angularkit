import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatePerfilAcessoComponent } from './template-perfil-acesso.component';

describe('TemplatePerfilAcessoComponent', () => {
  let component: TemplatePerfilAcessoComponent;
  let fixture: ComponentFixture<TemplatePerfilAcessoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplatePerfilAcessoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplatePerfilAcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
