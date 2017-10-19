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
  contacts = [];
  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.getContacts();
  }

  getContacts() {
    this.contactService.getContacts().subscribe(res => {
      this.contacts = res;
    });
  }

  getContactsStartWithChar(letters) {
    // this.contactService.subject$.next(undefined);

    if (letters.toUpperCase() === 'ALL') {
      return this.getContacts();
    }
    const chars = Array.from(letters);
    this.contacts = [];
    this.contactService.getContacts()
      .subscribe(res => {
        res.forEach(data => {
          const nameFirstChar = data.name.toUpperCase().split('')[0];
          if (nameFirstChar === chars[0]
            || nameFirstChar === chars[1]
            || nameFirstChar === chars[2]
            || nameFirstChar === chars[3]) {
            this.contacts.push(data);
          }
        });
      });

  }
}
