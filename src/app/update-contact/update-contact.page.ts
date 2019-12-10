import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
import { FirebaseService } from "../firebase.service";

@Component({
  selector: "app-update-contact",
  templateUrl: "./update-contact.page.html",
  styleUrls: ["./update-contact.page.scss"]
})
export class UpdateContactPage implements OnInit {
  contactForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private firebase: FirebaseService
  ) {
    this.createForm();
  }

  ngOnInit() {}

  createForm() {
    this.contactForm = this.formBuilder.group({
      mobile: new FormControl("", Validators.required),
      date: new FormControl("", Validators.required),
      title: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required)
    });
  }

  onSubmit(contactFormValue) {
    console.log(contactFormValue);
    this.firebase.updateContact(contactFormValue);
  }
}
