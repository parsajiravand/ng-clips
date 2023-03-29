import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import IUser from '../models/user.model';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userCollection = {} as AngularFirestoreCollection<IUser>;
  public isAuthenticated$: Observable<boolean>;

  constructor(private auth: AngularFireAuth, private db: AngularFirestore) {
    this.userCollection = this.db.collection('users');
    auth.user.subscribe(console.log);
    this.isAuthenticated$ = auth.user.pipe(map((user) => !!user));
  }

  public async createUser(userData: IUser) {
    if (!userData.password) throw new Error('Password is required!');

    // Create user in firebase auth
    const userCred = await this.auth.createUserWithEmailAndPassword(
      userData.email as string,
      userData.password as string
    );

    if (!userCred.user) throw new Error('User not found!');

    await this.userCollection.doc(userCred.user?.uid).set({
      name: userData.name,
      age: userData.age,
      email: userData.email,
      phoneNumber: userData.phoneNumber,
    });

    userCred.user.updateProfile({
      displayName: userData.name,
    });
  }
}
