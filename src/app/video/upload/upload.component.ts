import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent {
  isDragover = false;
  file: File | null = null;
  nextStep = false;

  //loading
  inSubmission = false;

  // alert variables
  showAlert = false;
  alertMsg = 'Please wait! We are processing your request...';
  alertColor = 'blue';

  // upload progress
  percentage = 0;

  constructor(private storage: AngularFireStorage) {}

  title = new FormControl('', {
    validators: [Validators.required, Validators.minLength(3)],
    nonNullable: true,
  });

  uploadForm = new FormGroup({
    title: this.title,
  });

  // Drag and drop file upload functions below here
  storeFile($event: Event) {
    this.isDragover = false;
    this.file = ($event as DragEvent).dataTransfer ?
      ($event as DragEvent).dataTransfer?.files.item(0) ?? null :
      ($event.target as HTMLInputElement).files?.item(0) ?? null

    if (!this.file || this.file.type !== 'video/mp4') {
      return;
    }
    this.title.setValue(this.file.name.replace(/\.[^/.]+$/, ''));
    this.nextStep = true;
  }

  // Upload file to firebase storage
  uploadFile() {
    this.showAlert = true;
    this.alertMsg = 'Please wait! We are processing your request...';
    this.alertColor = 'blue';
    this.inSubmission = true;
    // Create a unique file name
    const fileName = uuid();
    const clipPath = `clips/${fileName}.mp4`;

    console.log(this.file, this.title.value, clipPath)

    // Upload file to firebase storage
   const task = this.storage.upload(clipPath, this.file);
   task.percentageChanges().subscribe((percentage) => {
      console.log(percentage);
      this.percentage = percentage as number / 100;
    }
  }
}
