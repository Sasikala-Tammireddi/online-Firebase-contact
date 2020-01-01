import { Component, OnInit } from '@angular/core';
import {
  NavController,
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
    private navCtrl: NavController,
    private firebaseService: FirebaseService,
    private modalCtrl: ModalController,
    private router: Router,
    private toastController: ToastController
  ) {
    this.getContacts();
  }

  ngOnInit() {}

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
