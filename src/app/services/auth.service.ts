import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { delay, filter, map, Observable, of, switchMap } from 'rxjs';
import IUser from '../models/user.model';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userCollection = {} as AngularFirestoreCollection<IUser>;
  public isAuthenticated$: Observable<boolean>;
  public isAuthenticatedWithDelay$: Observable<boolean>;
  private redirect = false;

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userCollection = this.db.collection('users');
    auth.user.subscribe(console.log);
    this.isAuthenticated$ = auth.user.pipe(map((user) => !!user));
    this.isAuthenticatedWithDelay$ = this.isAuthenticated$.pipe(delay(1000));

    // this.route.data.subscribe((data) => {
    //   if (data.authOnly) {
    //     this.isAuthenticatedWithDelay$.subscribe((isAuthenticated) => {
    //       if (!isAuthenticated) {
    //         this.router.navigateByUrl('/login');
    //       }
    //     });
    //   }
    // });
    this.router.events
      .pipe(
        filter((event) => event instanceof ActivationEnd),
        map(() => this.route.firstChild),
        switchMap((route) => route?.data ?? of({}))
      )
      .subscribe((data) => {
        this.redirect = data['authOnly'] ?? false;
        console.log(data);
      });
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

  public async loginUser(userData: { email: string; password: string }) {
    if (!userData.password) throw new Error('Password is required!');

    const userCred = await this.auth.signInWithEmailAndPassword(
      userData.email as string,
      userData.password as string
    );

    if (!userCred.user) throw new Error('User not found!');
  }

  public async logout() {
    await this.auth.signOut();

    if (this.redirect) await this.router.navigateByUrl('/');
  }
}
