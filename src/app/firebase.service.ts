import { Injectable } from "@angular/core";
import * as firebase from "firebase";
import "firebase/firestore";
import { resolve } from "url";
@Injectable({
  providedIn: "root"
})
export class FirebaseService {
  contactDatabase: any;
  contactCollection: any;
  constructor() {
    this.contactDatabase = firebase.firestore;
    this.contactCollection = this.contactDatabase().collection("Contacts");
  }

  addContact(contactData) {
    this.contactCollection
      .doc(contactData.mobile)
      .set(contactData)
      .then(
        resp => {
          console.log("contact added Succesfully");
        },
        err => {
          console.log("Error ::::::::::", err);
        }
      );
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
    this.contactCollection
      .doc(contactData.mobile)
      .update(contactData)
      .then(
        resp => {
          console.log("Contact Updated Successfully");
        },
        err => {
          console.log("Error :::::::::::::", err);
        }
      );
  }

  deleteContact(mobile) {
    this.contactCollection
      .doc(mobile)
      .delete()
      .then(
        resp => {
          console.log("Contact deleted successfully");
        },
        err => {
          console.log("Error:::::::::", err);
        }
      );
  }
}
