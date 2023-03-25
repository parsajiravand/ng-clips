import { Component } from '@angular/core';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  constructor(public modal:ModalService ) { }

  openModal($event:Event, id:string){
    $event.preventDefault();
    this.modal.toggleModal(id);
  }
}
