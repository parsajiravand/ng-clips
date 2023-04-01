import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import IClip from 'src/app/models/clip.model';
import { ClipService } from 'src/app/services/clip.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {
  @Input() activeClip: IClip | null = null;
  @Output() update = new EventEmitter();
  inSubmission = false;
  showAlert = false;
  alertMsg = 'Please wait! We are processing your request...';
  alertColor = 'blue';

  clipID = new FormControl('', {
    nonNullable: true,
  });
  title = new FormControl('', {
    validators: [Validators.required, Validators.minLength(3)],
    nonNullable: true,
  });

  editForm = new FormGroup({
    clipID: this.clipID,
    title: this.title,
  });

  constructor(
    private modal: ModalService,

    private clipService: ClipService
  ) {}

  ngOnInit(): void {
    this.modal.register('editClip');
  }

  ngOnDestroy(): void {
    this.modal.unregister('editClip');
  }
  ngOnChanges(): void {
    if (!this.activeClip) {
      return;
    }
    this.inSubmission = false;
    this.showAlert = false;
    this.editForm.patchValue({
      clipID: this.activeClip.docID,
      title: this.activeClip.title,
    });
  }

  async submit() {
    if (!this.activeClip) {
      return;
    }
    this.inSubmission = true;
    this.showAlert = true;
    this.alertMsg = 'Please wait! We are processing your request...';
    this.alertColor = 'blue';

    try {
      await this.clipService.updateClip(this.clipID.value, this.title.value);
    } catch (error) {
      this.inSubmission = false;
      this.showAlert = true;
      this.alertMsg = error as string;
      this.alertColor = 'red';
      return;
    }

    this.activeClip.title = this.title.value;

    this.update.emit(this.activeClip);

    this.inSubmission = false;
    this.showAlert = true;
    this.alertMsg = 'Clip updated successfully!';
    this.alertColor = 'green';
    setTimeout(() => {
      this.modal.toggleModal('editClip');
    }, 1000);
  }
}
