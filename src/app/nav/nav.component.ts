import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  constructor(
    public modal: ModalService,
    public auth: AuthService,
  ) {}

  openModal($event: Event, id: string) {
    $event.preventDefault();
    this.modal.toggleModal(id);
  }

}
