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
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ClipService {
  public clipsCollection: AngularFirestoreCollection<IClip>;
  constructor(
    private db: AngularFirestore,

    private auth: AngularFireAuth
  ) {
    this.clipsCollection = this.db.collection<IClip>('clips');
  }

  createClip(clip: IClip): Promise<DocumentReference<IClip>> {
    return this.clipsCollection.add(clip);
  }
  getUserClips() {
    return this.auth.user.pipe(
      switchMap((user) => {
        if (!user) return of([]);

        const query = this.clipsCollection.ref.where('uid', '==', user.uid);
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
}
