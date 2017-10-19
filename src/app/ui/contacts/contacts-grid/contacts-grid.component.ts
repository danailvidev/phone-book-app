import { Component, Input, OnInit, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { IContact } from '../../../shared/interfaces';

@Component({
  selector: 'app-contacts-grid',
  templateUrl: './contacts-grid.component.html',
  styleUrls: ['./contacts-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactsGridComponent implements OnInit {
  @Input() contacts: IContact[] = [];
  @Output() getContactsStartWithChar: EventEmitter<any> = new EventEmitter();

  favoriteOption = 'ALL' as string;

    options = [
      'ALL',
      'DEF',
      'GHI',
      'JKL',
      'MNO',
      'PQRS',
      'TUV',
    ];
  constructor() { }

  ngOnInit() {
  }

  getByStartingChar(letters) {
    this.getContactsStartWithChar.emit(letters);
  }

}
