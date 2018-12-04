import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateInjectionComponent } from './template-injection.component';

describe('TemplateInjectionComponent', () => {
  let component: TemplateInjectionComponent;
  let fixture: ComponentFixture<TemplateInjectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateInjectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateInjectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
