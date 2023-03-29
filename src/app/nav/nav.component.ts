import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../services/auth.service';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  constructor(public modal: ModalService, public auth: AuthService,private afAuth:AngularFireAuth) {}

  openModal($event: Event, id: string) {
    $event.preventDefault();
    this.modal.toggleModal(id);
  }
  logout() {
    this.afAuth.signOut();
  }
}
