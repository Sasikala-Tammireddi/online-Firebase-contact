import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { FirebaseService } from "../firebase.service";
@Component({
  selector: "app-list",
  templateUrl: "list.page.html",
  styleUrls: ["list.page.scss"]
})
export class ListPage implements OnInit {
  public contacts: Array<any> = [];
  constructor(
    private navCtrl: NavController,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit() {
    this.getContacts();
  }

  addContact() {
    this.navCtrl.navigateRoot("home");
    this.getContacts();
  }

  getContacts() {
    this.firebaseService.getContacts().then(
      (data: any) => {
        this.contacts = data;
        console.log(data);
      },
      err => {
        console.log("Error::::::", err);
      }
    );
  }

  updateContact() {
    this.navCtrl.navigateRoot("update-contact");
    this.getContacts();
  }

  deleteContact(contact) {
    this.firebaseService.deleteContact(contact.mobile);
    this.getContacts();
  }
}
