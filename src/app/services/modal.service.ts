import { Injectable } from '@angular/core';

interface IModal {
  id: string;
  visible: boolean;
}
@Injectable()
export class ModalService {
  private modals: IModal[] = [];
  private visible = false;
  constructor() {}

  register(id: string) {
    this.modals.push({ id, visible: false });
  }

  isModalOpen(id:string) {
    const modal = this.modals.find((x) => x.id === id);
    if (!modal) return false;
    return modal.visible;
  }
  toggleModal( id: string ) {
    const modal = this.modals.find((x) => x.id === id);
    if (!modal) return;
    modal.visible = !modal.visible;
    // this.visible = !this.visible;
  }
}
