import { Component, OnInit, HostBinding } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { ContactService, LocalStorageService } from './core/index';
import { OverlayContainer } from '@angular/cdk/overlay';
import { trigger, animate, style, group, animateChild, query, stagger, transition } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routerAnimation', [
      transition('* <=> *', [
        /* order */
        /* 1 */ query(':enter, :leave', style({ position: 'absolute' })
          , { optional: true }),
        /* 2 */ group([  // block executes in parallel
          query(':enter', [
            style({ transform: 'translateX(100%)' }),
            animate('0.3s ease-in-out', style({ transform: 'translateX(0%)' }))
          ], { optional: true }),
          query(':leave', [
            style({ transform: 'translateX(0%)' }),
            animate('0.3s ease-in-out', style({ transform: 'translateX(-100%)' }))
          ], { optional: true }),
        ])
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  navigation = [
    { link: 'contacts', label: 'Contacts' },
    { link: 'settings', label: 'Settings' }
  ];
  searchBtn = '';
  theme: string;
  @HostBinding('class') componentCssClass;

  constructor(
    public overlayContainer: OverlayContainer,
    public authService: AuthService,
    public contactService: ContactService,
    private localStorageService: LocalStorageService) {
      this.localStorageService.themeSubject$.subscribe((theme) => {
        this.theme = theme;
        this.changeTheme(theme);
      });
  }

  ngOnInit(): void {
    this.setTheme();
  }

  // change the animation state
  getRouteAnimation(outlet) {
    return outlet.activatedRouteData.animation;
  }

  setTheme() {
    if (this.localStorageService.getItem('theme') != null) {
      this.theme = this.localStorageService.getItem('theme');
    } else {
      this.theme = 'default-theme';
    }
    this.changeTheme(this.theme);
  }

  changeTheme(theme) {
    this.componentCssClass = theme;
    this.overlayContainer.getContainerElement().classList.add(theme);
  }
}
