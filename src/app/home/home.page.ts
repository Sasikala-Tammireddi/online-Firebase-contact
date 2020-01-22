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
  constructor(
    private formBuilder: FormBuilder,
    private firebase: FirebaseService,
    public toastController: ToastController,
    private modalCtrl: ModalController
  ) {
    this.createForm();
  }
  contactForm: FormGroup;
  validationmessages = {
   'mobile': [
      { type: 'required', message: 'Mobile number is required.' },
      {
        type: 'minlength',
        message: 'Mobile must be at least 10 characters long.'
      },
      {
        type: 'maxlength',
        message: 'mobile cannot be more than 10 characters long.'
      }
    ],
    'date': [
      { type: 'required', message: 'Date is required.' }
    ],
    'title': [
      { type: 'required', message: 'Please enter title.' }
    ],
    'description': [
      { type: 'required', message: 'Description is required.' }
    ]
  };

  createForm() {
    this.contactForm = this.formBuilder.group({
      mobile: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10)
        ])
      ),
      date: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
  }

   /**
   * @description this method calls add contact method in firebase service.
   * @param (object) contactFormValue 
   */
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
