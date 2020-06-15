import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateErroComponent } from './template-erro.component';

describe('TemplateErroComponent', () => {
  let component: TemplateErroComponent;
  let fixture: ComponentFixture<TemplateErroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateErroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateErroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
