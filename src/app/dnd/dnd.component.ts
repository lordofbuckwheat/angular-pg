import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

declare var $;

@Component({
  selector: 'dnd',
  templateUrl: './dnd.component.html',
  styleUrls: ['./dnd.component.scss']
})
export class DndComponent implements AfterViewInit {

  @ViewChild('drag') private drag: ElementRef;
  @ViewChild('innerDrag') private innerDrag: ElementRef;
  @ViewChild('drop') private drop: ElementRef;

  constructor(private host: ElementRef) {}

  ngAfterViewInit(): void {
    let $drag = $(this.drag.nativeElement).add(this.innerDrag.nativeElement);
    let $drop = $(this.drop.nativeElement);
    let counter = 0;
    let moved = false;
    let $ghostImage;
    $drag.on('dragstart', ev => {
      console.log('dragstart', ev);
      counter = 0;
      $(ev.currentTarget).css('opacity', 0.5);
      ev.originalEvent.dataTransfer.effectAllowed = 'move';
      ev.originalEvent.dataTransfer.setData('application/json', JSON.stringify({
        x: 123,
        y: "456"
      }));
      $ghostImage = $(ev.currentTarget).clone();
      $ghostImage.css({
        position: 'absolute',
        bottom: 0,
        right: '-200px',
      });
      $(this.host.nativeElement).append($ghostImage);
      ev.originalEvent.dataTransfer.setDragImage($ghostImage.get(0), 0, 0);
      setTimeout(() => {
        if (!moved && counter == 0) {
          console.log('dragleave', ev);
        }
      }, 100);
    });
    $drag.on('dragend', ev => {
      console.log('dragend', ev);
      $(ev.currentTarget).css('opacity', '');
      moved = false;
      $ghostImage.remove();
    });
    $drop.on('dragover', ev => {
      //console.log('dragover', ev);
      if (ev.preventDefault) {
        ev.preventDefault(); // Necessary. Allows us to drop.
      }
      ev.originalEvent.dataTransfer.dropEffect = 'move';
      return false;
    });
    $drop.on('dragenter', ev => {
      moved = true;
      if (counter === 0) {
        console.log('dragenter', ev);
      }
      counter++;
    });
    $drop.on('dragleave', ev => {
      counter--;
      if (counter === 0) {
        console.log('dragleave', ev);
      }
    });
    $drop.on('drop', ev => {
      if (ev.stopPropagation) {
        ev.stopPropagation(); // stops the browser from redirecting.
      }
      console.log('drop', ev, JSON.parse(ev.originalEvent.dataTransfer.getData('application/json')));
      return false;
    });
  }

}
