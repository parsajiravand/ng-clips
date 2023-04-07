import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeURL'
})
export class SafeURLPipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer){

  }
  transform(value: string): unknown {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(value);
    
  }

}
