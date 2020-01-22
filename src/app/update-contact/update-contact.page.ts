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

@Component({
  selector: 'app-update-contact',
  templateUrl: './update-contact.page.html',
  styleUrls: ['./update-contact.page.scss']
})
export class UpdateContactPage implements OnInit {
  contactForm: FormGroup;
  public info: any;
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
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
    console.log('contact:::::::::::::::\n', this.info);
    this.contactForm.patchValue(this.info);
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
        this.modalCtrl.dismiss();
      },
      err => {
        console.log(err);
      }
    );
  }
}
