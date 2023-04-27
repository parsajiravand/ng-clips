import { Injectable } from '@angular/core';

interface IModal {
  id: string;
  visible: boolean;
}
@Injectable()
export class ModalService {
  private modals: IModal[] = [];
  private visible = false;
  register(id: string) {
    this.modals.push({ id, visible: false });
  }

  unregister(id: string) {
    this.modals = this.modals.filter((x) => x.id !== id);
    
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
