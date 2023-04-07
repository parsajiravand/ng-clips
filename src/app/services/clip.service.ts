import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
  QuerySnapshot,
} from '@angular/fire/compat/firestore';
import IClip from '../models/clip.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { switchMap, map } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
@Injectable({
  providedIn: 'root',
})
export class ClipService {
  public clipsCollection: AngularFirestoreCollection<IClip>;
  constructor(
    private db: AngularFirestore,
    private auth: AngularFireAuth,
    private storage: AngularFireStorage
  ) {
    this.clipsCollection = this.db.collection<IClip>('clips');
  }

  createClip(clip: IClip): Promise<DocumentReference<IClip>> {
    return this.clipsCollection.add(clip);
  }
  getUserClips(sort$: BehaviorSubject<string>) {
    return combineLatest([this.auth.user, sort$]).pipe(
      switchMap((values) => {
        const [user, sort] = values;
        if (!user) return of([]);

        const query = this.clipsCollection.ref
          .where('uid', '==', user.uid)
          .orderBy('timestamp', sort === '1' ? 'desc' : 'asc');
        return query.get();
      }),
      map((data) => {
        return (data as QuerySnapshot<IClip>).docs.map((doc) => {
          return {
            docID: doc.id,
            ...doc.data(),
          };
        });
      })
    );
  }

  updateClip(id: string, title: string) {
    return this.clipsCollection.doc(id).update({ title });
  }
  async deleteClip(clip: IClip) {
    const clipRef = this.storage.ref(`clips/${clip.fileName}`);
    const screenshot = this.storage.ref(
      `screenshots/${clip.screenshotFileName}`
    );
    await clipRef.delete();
    await screenshot.delete();
    await this.clipsCollection
      .doc(clip.docID)
      .delete()
      .then(() => clip);
  }
}
