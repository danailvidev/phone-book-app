import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const APP_PREFIX = 'DV-';

@Injectable()
export class LocalStorageService {
    themeSubject$ = new BehaviorSubject<string>('default-theme');
    constructor() { }

    setItem(key: string, value: any) {
        this.themeSubject$.next(value);
        localStorage.setItem(`${APP_PREFIX}${key}`, JSON.stringify(value));
    }

    getItem(key: string) {
        return JSON.parse(localStorage.getItem(`${APP_PREFIX}${key}`));
    }
}
