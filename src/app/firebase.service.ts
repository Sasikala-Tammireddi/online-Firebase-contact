import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { resolve } from 'url';
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
    // tslint:disable-next-line:no-shadowed-variable
    return new Promise((resolve, reject) => {
      this.contactCollection
        .doc(contactData.mobile)
        .set(contactData)
        .then(
          data => {
            resolve(data);
          },
          error => {
            reject(error);
          }
        );
    });
  }

  getContacts() {
    // tslint:disable-next-line:no-shadowed-variable
    return new Promise((resolve, reject) => {
      this.contactCollection.get().then(
        resp => {
          const contacts: Array<any> = [];
          resp.forEach(element => {
            contacts.push(element.data());
          });
          resolve(contacts);
        },
        error => {
          reject(error);
        }
      );
    });
  }

  updateContact(contactData) {
    // tslint:disable-next-line:no-shadowed-variable
    return new Promise((resolve, reject) => {
      this.contactCollection
        .doc(contactData.mobile)
        .update(contactData)
        .then(
          data => {
            resolve(data);
          },
          error => {
            reject(error);
          }
        );
    });
  }

  deleteContact(mobile) {
    // tslint:disable-next-line:no-shadowed-variable
    return new Promise((resolve, reject) => {
      this.contactCollection
        .doc(mobile)
        .delete()
        .then(
          data => {
            resolve(data);
          },
          error => {
            reject(error);
          }
        );
    });
  }
}
