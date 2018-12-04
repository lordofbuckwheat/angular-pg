import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit, OnChanges {
  @Input() param1: number = 0;
  @Input() param2: number = 0;

  constructor() {
    console.log('test constructor');
  }

  ngOnInit(): void {
    console.log('init', this.param1, this.param2);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('change', JSON.parse(JSON.stringify(changes)));
  }

}
