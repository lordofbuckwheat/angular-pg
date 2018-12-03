import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public param1;
  public param2;
  constructor() {
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.param1 = 123;
    }, 1000);
    setTimeout(() => {
      this.param2 = 456;
    }, 1000);
  }
}
