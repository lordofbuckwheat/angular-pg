import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateInjectionInnerComponent } from './template-injection-inner.component';

describe('TemplateInjectionInnerComponent', () => {
  let component: TemplateInjectionInnerComponent;
  let fixture: ComponentFixture<TemplateInjectionInnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateInjectionInnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateInjectionInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
