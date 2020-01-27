import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import { FirebaseService } from '../firebase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, NavParams, ModalController } from '@ionic/angular';
import { validationMessages } from 'src/app/validationMessages';

@Component({
  selector: 'app-update-contact',
  templateUrl: './update-contact.page.html',
  styleUrls: ['./update-contact.page.scss']
})
export class UpdateContactPage implements OnInit {
  public contactForm: FormGroup;
  public info: any;
  public validationmessages = validationMessages;

  constructor(
    private formBuilder: FormBuilder,
    private firebase: FirebaseService,
    private route: ActivatedRoute,
    private toastController: ToastController,
    private navParams: NavParams,
    private modalCtrl: ModalController
  ) {
    this.info = this.navParams.get('data');
    this.createForm();
  }

  ngOnInit() { }

  createForm() {
    this.contactForm = this.formBuilder.group({
      mobile: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
    console.log('contact:::::::::::::::\n', this.info);
    this.contactForm.patchValue(this.info);
  }

  /**
   * @description  closes modal
   */
  dismissModal() {
    this.modalCtrl.dismiss();
  }

  /**
  * @description this method calls update contact method in firebase service.
  * @param (object) contactFormValue 
  */
  onSubmit(contactFormValue) {
    console.log(contactFormValue);
    this.firebase.updateContact(contactFormValue).then(
      async () => {
        const toast = await this.toastController.create({
          message: 'Contact updated Successfully.',
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
