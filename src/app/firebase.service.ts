import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import 'firebase/firestore';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  contactDatabase: any;
  contactCollection: any;
  constructor() {
    this.contactDatabase = firebase.firestore;
    this.contactCollection = this.contactDatabase().collection('Contacts');
  }
  
  addContact(contactData) {
    this.contactCollection
      .doc(contactData.mobile)
      .set(contactData)
      .then(
        resp => {
          console.log('contact added Succesfully');
        },
        err => {
          console.log('Error ::::::::::', err);
        }
      );
  }
}
