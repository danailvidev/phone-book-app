import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent, ContactsComponent, ContactsGridComponent, ContactsEditComponent, SettingsComponent } from './ui/index';

import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'contacts', component: ContactsComponent, canActivate: [AuthGuard], data: { animation: 'animation' } },
    { path: 'contact-edit/:id', component: ContactsEditComponent, canActivate: [AuthGuard], data: { animation: 'animation2' } },
    { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard], data: { animation: 'animation3' } },
    { path: '**', pathMatch: 'full', redirectTo: '/home' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
    static components = [ContactsComponent, HomeComponent, ContactsGridComponent, ContactsEditComponent, SettingsComponent];
}
