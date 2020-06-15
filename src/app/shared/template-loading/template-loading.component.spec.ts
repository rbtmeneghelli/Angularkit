import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateLoadingComponent } from './template-loading.component';

describe('TemplateLoadingComponent', () => {
  let component: TemplateLoadingComponent;
  let fixture: ComponentFixture<TemplateLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
