import { Component, Input, ElementRef } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() modalID = '';

  constructor(public modal: ModalService, public el: ElementRef) {
    console.log(el);
  }

  ngOnInit(): void {
    document.body.appendChild(this.el.nativeElement);
  }
  
  closeModal() {
    this.modal.toggleModal(this.modalID);
  }
}
