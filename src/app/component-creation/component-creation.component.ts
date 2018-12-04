import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  OnInit,
  Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {TestComponent} from "../test/test.component";

@Component({
  selector: 'component-creation',
  templateUrl: './component-creation.component.html',
  styleUrls: ['./component-creation.component.scss']
})
export class ComponentCreationComponent implements AfterViewInit {

  @ViewChild('vc', {read: ViewContainerRef}) vc: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {

  }

  ngAfterViewInit(): void {
    this.createComponent(TestComponent);
  }

  private createComponent(component: Type<any>) {
    const factory = this.componentFactoryResolver.resolveComponentFactory(component);
    this.vc.createComponent(factory);
  }

}
