import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import { FirebaseService } from '../firebase.service';
import { ToastController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  contactForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private firebase: FirebaseService,
    public toastController: ToastController,
    private modalCtrl: ModalController
  ) {
    this.createForm();
  }

  createForm() {
    this.contactForm = this.formBuilder.group({
      mobile: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
  }

  onSubmit(contactFormValue) {
    console.log(contactFormValue);
    this.firebase.addContact(contactFormValue).then(
      async () => {
        const toast = await this.toastController.create({
          message: 'Contact added Successfully.',
          duration: 2000
        });
        toast.present();
        this.modalCtrl.dismiss();
      },
      err => {
        console.log(err);
      }
    );
  }
}
