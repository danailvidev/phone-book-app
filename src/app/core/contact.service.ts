import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { IContact } from '../shared/interfaces';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/observable/combineLatest';
// import 'rxjs/add/observable/forkJoin';
// import 'rxjs/add/operator/concat';
// import 'rxjs/add/operator/mergeMap';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ContactService {
    contacts$: FirebaseListObservable<IContact[]>;
    subject$ = new BehaviorSubject<string>(undefined);

    constructor(public db: AngularFireDatabase) {
        this.contacts$ = this.db.list(`contacts`);
    }

    getContact(contactKey: string) {
        return this.db.object(`/contacts/${contactKey}`);
    }

    // [Obsolete("use this method to get filtered contacts from db")]
    getContactsStartWithChar(letters: string) {
        if (letters.toUpperCase() === 'ALL') {
            return this.getContacts();
        }
        const array = Array.from(letters);

        // const test = this.db.database.ref()
        //     .child('contacts')
        //     .orderByChild('name')
        //     .startAt(array[0])
        //     .endAt(array[0] + '\uf8ff');

        //     console.log(test);
        const list1 = this.db.list(`contacts`, {
            query: {
                orderByChild: 'name',
                startAt: array[0],
                endAt: array[0] + '\uf8ff'
            }
        });

        const list2 = this.db.list(`contacts`, {
            query: {
                orderByChild: 'name',
                startAt: array[1],
                endAt: array[1] + '\uf8ff'
            }
        });

        // return list1.concat(list2);

        //  return Observable.forkJoin(list1, list2).subscribe((res: any) => {
        //      this.test = res;
        //      console.log(this.test);
        //      return this.test;
        //     });

        // return Observable.combineLatest(
        //     list1,
        //     list2
        //   )
        //   .flatMap( (data) => {
        //       console.log(data);
        //       return data;
        //     });


        // return this.db.list(`contacts`, {
        //     query: {
        //         orderByChild: 'name',
        //         startAt: array[0],
        //         endAt: array[0] + '\uf8ff'
        //     }
        // });
    }

    saveContact(contact: IContact) {
        contact.name = this.capitalizeFirstLetter(contact.name);
        return this.contacts$.push(contact)
            .then(_ => console.log('success save'));
    }

    updateContact(contact: IContact) {
        const updateContact = {};
        updateContact[`contacts/${contact.$key}`] = contact;

        return this.db.object('/').update(updateContact)
            .then(_ => console.log('success update'))
            .catch(this.handleError);
    }

    deleteContact(contact: IContact) {
        const deleteContact = {};
        deleteContact[`contacts/${contact.$key}`] = null;

        return this.db.object('/').update(deleteContact)
            .then(_ => console.log('success delete'))
            .catch(this.handleError);
    }

    // TODO: refactor
    getContacts() {
        return this.subject$
            .switchMap(companyKey => companyKey === undefined
                ? this.contacts$
                : this.db.list(`companyContacts/${companyKey}`))
            .catch(this.handleError);
    }


    private handleError(error) {
        // error service code
        console.error('server error:', error);
        if (error instanceof Response) {
            let errMessage = '';
            try {
                errMessage = error.json().error;
            } catch (err) {
                errMessage = error.statusText;
            }
            return Observable.throw(errMessage);
        }
        return Observable.throw(error || 'json server error');
    }

    private capitalizeFirstLetter(string) {

        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}
