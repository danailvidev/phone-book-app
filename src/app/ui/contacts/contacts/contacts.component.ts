import { Component, OnInit } from '@angular/core';

import { ContactService } from '../../../core/index';
import { IContact } from '../../../shared/interfaces';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  contacts$: Observable<IContact[]>;
  test: any;
  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.getContacts();
  }

  getContacts() {
    this.contacts$ = this.contactService.getContacts();
    console.log('contacts$', this.contacts$);
  }

  getContactsStartWithChar(letters) {
    this.contacts$ = this.contactService.getContactsStartWithChar(letters);
  }
}
