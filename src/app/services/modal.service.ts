import { Injectable } from '@angular/core';

@Injectable()
export class ModalService {
 private visible = false;
  constructor() {}

  isModalOpen() {
    return this.visible;
  }
  toggleModal() {
    this.visible = !this.visible;
  }
}
