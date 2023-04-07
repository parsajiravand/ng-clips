import { Component, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { last, switchMap } from 'rxjs';
import { v4 as uuid } from 'uuid';
import firebase from 'firebase/compat/app';
import { ClipService } from 'src/app/services/clip.service';
import { Router } from '@angular/router';
import { FfmpegService } from 'src/app/services/ffmpeg.service';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnDestroy {
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
  showPercentage = false;

  //user
  user: firebase.User | null = null;

  //task
  task?: AngularFireUploadTask;

  constructor(
    private storage: AngularFireStorage,
    private auth: AngularFireAuth,
    private clipService: ClipService,
    private router: Router,
    public ffmpegService:FfmpegService
  ) {
    auth.user.subscribe((user) => {
      this.user = user;
    });
    this.ffmpegService.init()
  }

  title = new FormControl('', {
    validators: [Validators.required, Validators.minLength(3)],
    nonNullable: true,
  });

  uploadForm = new FormGroup({
    title: this.title,
  });

  // Drag and drop file upload functions below here
  async storeFile($event: Event) {
    this.isDragover = false;
    this.file = ($event as DragEvent).dataTransfer
      ? ($event as DragEvent).dataTransfer?.files.item(0) ?? null
      : ($event.target as HTMLInputElement).files?.item(0) ?? null;

    if (!this.file || this.file.type !== 'video/mp4') {
      return;
    }
    await this.ffmpegService.getScreenshots(this.file)
    this.title.setValue(this.file.name.replace(/\.[^/.]+$/, ''));
    this.nextStep = true;
  }

  // Upload file to firebase storage
  uploadFile() {
    this.uploadForm.disable();
    this.showAlert = true;
    this.alertMsg = 'Please wait! We are processing your request...';
    this.alertColor = 'blue';
    this.inSubmission = true;
    this.showPercentage = true;
    // Create a unique file name
    const fileName = uuid();
    const clipPath = `clips/${fileName}.mp4`;

    console.log(this.file, this.title.value, clipPath);

    // Upload file to firebase storage
    const task = this.storage.upload(clipPath, this.file);
    const clipRef = this.storage.ref(clipPath);
    task.percentageChanges().subscribe((percentage) => {
      console.log(percentage);
      this.percentage = (percentage as number) / 100;
    });

    // Get notified when the download URL is available
    task
      .snapshotChanges()
      .pipe(
        last(),
        switchMap(() => clipRef.getDownloadURL())
      )
      .subscribe({
        next: async (url) => {
          const clip = {
            uid: this.user?.uid as string,
            title: this.title.value,
            displayName: this.user?.displayName as string,
            fileName: `${fileName}.mp4`,
            url,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          };

          // clip service
          const clipDocRef = await this.clipService.createClip(clip);

          this.showAlert = true;
          this.alertMsg = 'File uploaded successfully!';
          this.alertColor = 'green';
          this.inSubmission = false;
          this.showPercentage = false;

          setTimeout(() => {
            this.router.navigate(['clip', clipDocRef.id])
          }, 1000);
        },
        error: (err) => {
          this.uploadForm.enable();

          this.showAlert = true;
          this.alertMsg = err.message;
          this.alertColor = 'red';
          this.showPercentage = false;
          this.inSubmission = false;
          console.error(err);
        },
      });
  }

  ngOnDestroy(): void {
    this.task?.cancel();
  }
}
