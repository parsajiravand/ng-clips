import firebase from 'firebase/compat/app';
export default interface IClip {
  uid: string;
  title: string;
  displayName: string;
  fileName: string;
  url: string;
  timestamp: firebase.firestore.FieldValue;
}
