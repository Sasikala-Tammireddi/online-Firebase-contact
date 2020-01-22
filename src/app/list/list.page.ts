import { Component, OnInit } from '@angular/core';
import {
  ModalController,
  ToastController
} from '@ionic/angular';
import { FirebaseService } from '../firebase.service';
import { HomePage } from '../home/home.page';
import { UpdateContactPage } from '../update-contact/update-contact.page';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  public contacts: Array<any> = [];
  constructor(
    private firebaseService: FirebaseService,
    private modalCtrl: ModalController,
    private router: Router,
    private toastController: ToastController
  ) {
    this.getContacts();
  }

  ngOnInit() { }

  /**
   * @description this method opens add contact page as a modal
   */
  addContact() {
    const modal = this.modalCtrl
      .create({ component: HomePage })
      .then(modalElement => {
        modalElement.present();
        modalElement.onDidDismiss().then(() => {
          this.getContacts();
        });
      });
  }

  /**
   * @description This method allows to retriew contacts
   */
  getContacts() {
    this.firebaseService.getContacts().then(
      (data: any) => {
        this.contacts = data;
        console.log(data);
      },
      err => {
        console.log('Error::::::', err);
      }
    );
  }

  /**
   * @description this method opens update contact page as a modal
   * @param (object)contact 
   */
  updateContact(contact) {
    this.modalCtrl
      .create({
        component: UpdateContactPage,
        componentProps: {
          data: contact
        }
      })
      .then(modalElement => {
        modalElement.present();
        modalElement.onDidDismiss().then(() => {
          this.getContacts();
        });
      });
  }

  /**
   * @description this method calls delete contact method in firebase service.
   * @param (object) contact 
   */
  deleteContact(contact) {
    this.firebaseService.deleteContact(contact.mobile).then(
      async () => {
        const toast = await this.toastController.create({
          message: 'Contact deleted Successfully.',
          duration: 2000
        });
        toast.present();
        this.getContacts();
      },
      err => {
        console.log(err);
      }
    );
  }
}
