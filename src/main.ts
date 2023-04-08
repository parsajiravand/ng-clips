import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {environment} from './environments/environment';

firebase.initializeApp({
  apiKey:environment.firebase.apiKey,
  authDomain: 'clips-test.firebaseapp.com',
  projectId: 'clips-test',
  storageBucket: 'clips-test.appspot.com',
  messagingSenderId: '775118698720',
  appId: '1:775118698720:web:ef3ebbad77a633f874f885',
  measurementId: 'G-4QLBBNR1S9',
});


let appInit = false;
firebase.auth().onAuthStateChanged(()=>{
  if(!appInit){
    platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
    
  }
  appInit = true;
})



