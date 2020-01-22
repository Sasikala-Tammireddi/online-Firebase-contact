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

  /**
   * @description Addeds contact in database
   * @param contactData 
   */
  addContact(contactData) {
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

  /**
   * @description Retriews contacts from the database
   */
  getContacts() {
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

  /**
   * @description update contact in database based on id
   * @param contactData 
   */
  updateContact(contactData) {
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

  /**
   * @description  Deletes contact from database based on id.
   * @param mobile 
   */
  deleteContact(mobile) {
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
