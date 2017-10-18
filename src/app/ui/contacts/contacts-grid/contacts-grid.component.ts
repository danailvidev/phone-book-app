import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { IContact } from '../../../shared/interfaces';

@Component({
  selector: 'app-contacts-grid',
  templateUrl: './contacts-grid.component.html',
  styleUrls: ['./contacts-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactsGridComponent implements OnInit {
  @Input() contacts: IContact[] = [];
  constructor() { }

  ngOnInit() {
  }

}
