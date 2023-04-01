import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import IClip from '../models/clip.model';
@Injectable({
  providedIn: 'root',
})
export class ClipService {
  public clipsCollection: AngularFirestoreCollection<IClip>;
  constructor(private db: AngularFirestore) {
    this.clipsCollection = this.db.collection<IClip>('clips');
  }

  async createClip(clip: IClip) {
    await this.clipsCollection.add(clip);
  }
}
