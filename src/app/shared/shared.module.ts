import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { ModalService } from '../services/modal.service';
import { TabContainerComponent } from './tab-container/tab-container.component';
import { TabComponent } from './tab/tab.component';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { AlertComponent } from './alert/alert.component';
@NgModule({
  declarations: [
    ModalComponent,
    TabContainerComponent,
    TabComponent,
    InputComponent,
    AlertComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective, NgxMaskPipe],
  exports: [
    ModalComponent,
    TabContainerComponent,
    TabComponent,
    InputComponent,
    AlertComponent
  ],
  providers: [ModalService, provideNgxMask()],
})
export class SharedModule {}
