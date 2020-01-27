import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import { FirebaseService } from '../firebase.service';
import { ToastController, ModalController } from '@ionic/angular';
import { validationMessages } from 'src/app/validationMessages';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  public contactForm: FormGroup;
  public validationmessages = validationMessages;
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
      mobile: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10)
        ])
      ),
      date: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
  }

  /**
   * @description  closes modal
   */
  dismissModal() {
    this.modalCtrl.dismiss();
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
      },
      err => {
        console.log(err);
      }
    );
  }
}
