import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent, ContactsComponent, ContactsGridComponent, ContactsEditComponent } from './ui/index';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: '**', pathMatch: 'full', redirectTo: '/home' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
    static components = [ContactsComponent, HomeComponent, ContactsGridComponent, ContactsEditComponent];
}
