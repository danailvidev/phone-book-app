import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../../core/contact.service';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { IContact } from '../../../shared/interfaces';
import { Location } from '@angular/common';
import 'rxjs/add/observable/of';
import * as firebase from 'firebase/app'; // typings only

@Component({
  selector: 'app-contacts-edit',
  templateUrl: './contacts-edit.component.html',
  styleUrls: ['./contacts-edit.component.scss']
})
export class ContactsEditComponent implements OnInit {
  isNewContact: boolean;
  contactKey: string;
  contact = {} as IContact;
  EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  private emailFormControl = new FormControl('', [Validators.required, Validators.pattern(this.EMAIL_REGEX)]);

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private contactService: ContactService) {

  }

  ngOnInit() {
    this.contactKey = this.activatedRoute.snapshot.params['id'];
    this.isNewContact = this.contactKey === 'new';
    if (!this.isNewContact) {
      this.getContact(this.contactKey);
    }
  }

  getContact(key) {
    this.contactService.getContact(key)
      .subscribe((contact) => {
        this.contact = contact;
      });
  }

  saveContact(contact) {

    const save = this.isNewContact
      ? this.contactService.saveContact(contact)
      : this.contactService.updateContact(contact);
    console.log('save', save);
    this.router.navigate([`contacts`]);
  }

  deleteContact(contact) {
    this.contactService.deleteContact(contact)
      .then(_ => this.location.back());
  }

  uploadFile(event: any) {
    const file = event.srcElement.files[0];
    const storageRef = firebase.storage().ref(`contacts/${this.contactKey}`);
    storageRef.put(file)
      .then(uploadTask => this.contact.imageUrl = uploadTask.downloadURL);
  }

  back() {
    this.location.back();
  }

}
