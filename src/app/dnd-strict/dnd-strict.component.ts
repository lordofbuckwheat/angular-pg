import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Events} from "../events"

declare var $;

function Movable($target, $area, deadZone, $handle) {
  Events.call(this);
  $handle = $handle || $target;
  if (!deadZone && deadZone !== 0) {
    deadZone = 10;
  }
  const $doc = $(document);
  const parentX = $area.offset().left+parseInt($area.css('border-left-width'),10);
  const parentY = $area.offset().top+parseInt($area.css('border-top-width'),10);
  let maxX = $area.innerWidth()-$target.outerWidth();
  let minX = 0;
  let maxY = $area.innerHeight()-$target.outerHeight();
  let minY = 0;
  let initialX = $target.offset().left - parentX;
  let initialY = $target.offset().top - parentY;
  let currentX = initialX;
  let currentY = initialY;
  let step;
  const __this = this;
  let dragging = false;
  function _moveAt(x: number, y: number) {
    if (x < minX) x = minX;
    if (x > maxX) x = maxX;
    if (y < minY) y = minY;
    if (y > maxY) y = maxY;
    if ((Math.abs(x - currentX) > step) || Math.abs(y - currentY) > step) {
      $handle.css('pointer-events', 'none');
      if (!dragging) {
        dragging = true;
        __this.emit('start');
      }
      step = 0;
      __this.emit('move', {
        x: x,
        y: y
      });
      currentX = x;
      currentY = y;
      $target.css('transform', `translate(${currentX-initialX}px, ${currentY-initialY}px)`);
    }
  }
  this.moveAt = function(x: number, y: number) {
    maxX = $area.innerWidth()-$target.outerWidth();
    maxY = $area.innerHeight()-$target.outerHeight();
    if (x < minX) x = minX;
    if (x > maxX) x = maxX;
    if (y < minY) y = minY;
    if (y > maxY) y = maxY;
    currentX = x;
    currentY = y;
    $target.css('transform', `translate(${currentX-initialX}px, ${currentY-initialY}px)`);
  };
  $(window).resize(ev => {
    maxX = $area.innerWidth()-$target.outerWidth();
    maxY = $area.innerHeight()-$target.outerHeight();
    _moveAt(currentX, currentY);
    $handle.css('pointer-events', '');
  });
  $handle.on('click', () => {
    this.emit('click');
  });
  $handle.on('mousedown', ev => {
    $doc.css('user-select', 'none');
    $('body').css('pointer-events', 'none');
    $area.css('pointer-events', 'auto');
    maxX = $area.innerWidth()-$target.outerWidth();
    maxY = $area.innerHeight()-$target.outerHeight();
    step = deadZone;
    const shiftX = ev.pageX - $target.offset().left;
    const shiftY = ev.pageY - $target.offset().top;
    currentX = ev.pageX-shiftX-parentX;
    currentY = ev.pageY-shiftY-parentY;
    $doc.on('mousemove', ev => {
      _moveAt(ev.pageX-shiftX-parentX, ev.pageY-shiftY-parentY);
    });
    $doc.on('mouseup', ev => {
      $handle.css('pointer-events', '');
      $doc.off('mousemove');
      $doc.off('mouseup');
      if (dragging) {
        this.emit('end');
        dragging = false;
      }
      $('body').css('pointer-events', '');
      $area.css('pointer-events', '');
      $doc.css('user-select', '');
    });
  });
  $target.on('dragstart', () => {
    return false;
  });
  this.getEl = function() {
    return $target;
  };
  this.getArea = function() {
    return $area;
  };
  this.moveBy = function(dx, dy) {
    let x = currentX + dx;
    let y = currentY + dy;
    this.moveAt(x, y);
  };
  this.getPos = function() {
    return {
      x: currentX,
      y: currentY
    };
  }
}

function Resizable(target, minWidth, minHeight, handleWidth) {
  Events.call(this);
  const $doc = $(document);
  const $target = target.getEl();
  const $area = target.getArea();
  const parentX = $area.offset().left+parseInt($area.css('border-left-width'),10);
  const parentY = $area.offset().top+parseInt($area.css('border-top-width'),10);
  const $resizable = $('<div class="resizable"></div>');
  const $handle = $('<div class="resizable__handle"></div>');
  $target.append($resizable);
  $handle.on('mousedown', ev => {
    const $this = $(ev.currentTarget);
    const directions = $this.data('directions');
    $doc.css('user-select', 'none');
    $('body').css('pointer-events', 'none');
    $area.css('pointer-events', 'auto');
    $('body').css('cursor', $this.css('cursor'));
    let minX = directions[1] ? (directions[1] === 'right' ? minWidth - $target.outerWidth() : parentX - $target.offset().left) : 0;
    let minY = directions[0] ? (directions[0] === 'bottom' ? minHeight - $target.outerHeight() : parentY - $target.offset().top) : 0;
    let maxX = directions[1] ? (directions[1] === 'right' ? $area.innerWidth() - $target.offset().left + parentX - $target.outerWidth() : $target.outerWidth() - minWidth) : 0;
    let maxY = directions[0] ? (directions[0] === 'bottom' ? $area.innerHeight() - $target.offset().top + parentY - $target.outerHeight() : $target.outerHeight() - minHeight) : 0;
    let offsetX = $this.offset().left;
    let offsetY = $this.offset().top;
    const shiftX = ev.pageX - $this.offset().left;
    const shiftY = ev.pageY - $this.offset().top;
    $resizable.addClass('resizable_active');
    $resizable.css('display', 'block');
    let resizing = false;
    const __this = this;
    let cx, cy;
    function _resize(x: number, y: number) {
      if (x < minX) x = minX;
      if (x > maxX) x = maxX;
      if (y < minY) y = minY;
      if (y > maxY) y = maxY;
      if (x !== cx || y !== cy) {
        if (!resizing) {
          __this.emit('start');
          resizing = true;
        }
        if (directions[0] === 'top') {
          $resizable.css('top', y);
        } else if (directions[0] === 'bottom') {
          $resizable.css('bottom', -y);
        }
        if (directions[1] === 'left') {
          $resizable.css('left', x);
        } else if (directions[1] === 'right') {
          $resizable.css('right', -x);
        }
        __this.emit('resize', {
          x: directions[1] === 'left' ? offsetX - parentX + x : target.getPos()['x'],
          y: directions[0] === 'top' ? offsetY - parentY + y : target.getPos()['y'],
          width: $resizable.outerWidth(),
          height: $resizable.outerHeight(),
        });
        cx = x;
        cy = y;
      }
    }
    $doc.on('mousemove', ev => {
      _resize(ev.pageX-shiftX-offsetX, ev.pageY-shiftY-offsetY);
    });
    $doc.on('mouseup', ev => {
      $this.css('pointer-events', '');
      $this.css('transform', '');
      $doc.off('mousemove');
      $doc.off('mouseup');
      $doc.css('user-select', '');
      $('body').css('pointer-events', '');
      $area.css('pointer-events', '');
      $('body').css('cursor', '');
      $resizable.css('display', '');
      const width = $resizable.outerWidth();
      const height = $resizable.outerHeight();
      const x = parseInt($resizable.css('left'), 10);
      const y = parseInt($resizable.css('top'), 10);
      $resizable.attr('style', '');
      $target.css({
        width: width,
        height: height
      });
      $resizable.removeClass('resizable_active');
      target.moveBy(x, y);
      if (resizing) {
        __this.emit('end');
        resizing = false;
      }
    });
  });
  $handle.clone(true).addClass('resizable__handle_tl').data('directions', ['top', 'left']).appendTo($resizable);
  $handle.clone(true).addClass('resizable__handle_t').data('directions', ['top']).appendTo($resizable);
  $handle.clone(true).addClass('resizable__handle_tr').data('directions', ['top', 'right']).appendTo($resizable);
  $handle.clone(true).addClass('resizable__handle_r').data('directions', [null, 'right']).appendTo($resizable);
  $handle.clone(true).addClass('resizable__handle_br').data('directions', ['bottom', 'right']).appendTo($resizable);
  $handle.clone(true).addClass('resizable__handle_b').data('directions', ['bottom']).appendTo($resizable);
  $handle.clone(true).addClass('resizable__handle_bl').data('directions', ['bottom', 'left']).appendTo($resizable);
  $handle.clone(true).addClass('resizable__handle_l').data('directions', [null, 'left']).appendTo($resizable);

  if (handleWidth) {
    $resizable.children('div').css({
        width: handleWidth,
        height: handleWidth,
        margin: 0
    });
    $resizable.find('.resizable__handle_l').css({ transform: 'translateY(-50%)' });
    $resizable.find('.resizable__handle_r').css({ transform: 'translateY(-50%)' });
    $resizable.find('.resizable__handle_r').css({ transform: 'translateY(-50%)' });
    $resizable.find('.resizable__handle_t').css({ transform: 'translateX(-50%)' });
    $resizable.find('.resizable__handle_b').css({ transform: 'translateX(-50%)' });
}

}


@Component({
  selector: 'dnd-strict',
  templateUrl: './dnd-strict.component.html',
  styleUrls: ['./dnd-strict.component.scss']
})
export class DndStrictComponent implements AfterViewInit {

  @ViewChild('target') target: ElementRef;
  @ViewChild('area') area: ElementRef;
  @ViewChild('handle') handle: ElementRef;
  @ViewChild('outside') outside: ElementRef;

  constructor() { }

  ngAfterViewInit(): void {
    const movable = new Movable($(this.target.nativeElement), $(this.area.nativeElement), 10, $(this.handle.nativeElement));
    movable.on('move', pos => {
      console.log(pos);
    });
    movable.on('click', () => {
      console.log('click');
    });
    movable.on('start', () => {
      console.log('start');
    });
    movable.on('end', () => {
      console.log('end');
    });
    const resizable = new Resizable(movable, 50, 50);
    resizable.on('start', () => {
      console.log('resize start');
    });
    resizable.on('end', () => {
      console.log('resize end');
    });
    resizable.on('resize', pos => {
      console.log('resize', pos);
    });
    $(this.outside.nativeElement).hover(() => {
      $(this.outside.nativeElement).css('background-color', 'white');
    }, () => {
      $(this.outside.nativeElement).css('background-color', 'black');
    });
  }

}
