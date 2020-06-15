import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateTbGenericaComponent } from './template-tb-generica.component';

describe('TemplateTbGenericaComponent', () => {
  let component: TemplateTbGenericaComponent;
  let fixture: ComponentFixture<TemplateTbGenericaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateTbGenericaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateTbGenericaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
