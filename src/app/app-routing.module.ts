import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent, ContactsComponent, ContactsGridComponent, ContactsEditComponent } from './ui/index';

import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'contacts', component: ContactsComponent, canActivate: [AuthGuard] },
    { path: 'contact-edit/:id', component: ContactsEditComponent, canActivate: [AuthGuard] },
    { path: '**', pathMatch: 'full', redirectTo: '/home' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
    static components = [ContactsComponent, HomeComponent, ContactsGridComponent, ContactsEditComponent];
}
