import {AfterViewInit, Component, OnInit, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {NgForOfContext} from "@angular/common";

interface Item {
  x: string,
  y: number
}

@Component({
  selector: 'template-injection',
  templateUrl: './template-injection.component.html',
  styleUrls: ['./template-injection.component.scss']
})
export class TemplateInjectionComponent implements AfterViewInit {

  @ViewChild('template') template: TemplateRef<Item>;
  @ViewChild('vc', {read: ViewContainerRef}) vc: ViewContainerRef;

  public items: Item[] = [{
    x: 'a',
    y: 1
  }, {
    x: 'b',
    y: 2
  }, {
    x: 'c',
    y: 3
  }, {
    x: 'd',
    y: 4
  }];

  constructor() { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.vc.createEmbeddedView(this.template, {
        x: 'asd',
        y: 123
      });
    }, 1000);
  }

}
