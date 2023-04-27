import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appEventBlocker]'
})
export class EventBlockerDirective {

  
  @HostListener('drop', ['$event'])
  @HostListener('dragover', ['$event'])
  public handelEvent(event:Event){
    event.preventDefault();
    event.stopPropagation();
  }

}
