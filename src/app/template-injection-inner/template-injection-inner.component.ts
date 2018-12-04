import {Component, ContentChild, Input, OnInit, TemplateRef} from '@angular/core';
import {NgForOfContext} from "@angular/common";

@Component({
  selector: 'template-injection-inner',
  templateUrl: './template-injection-inner.component.html',
  styleUrls: ['./template-injection-inner.component.scss']
})
export class TemplateInjectionInnerComponent implements OnInit {

  @ContentChild(TemplateRef) itemTemplate: TemplateRef<NgForOfContext<any>>;
  @Input('items') items: any[];

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.items.shift();
    }, 2000)
  }

}
