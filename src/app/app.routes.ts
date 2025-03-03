import { Routes } from '@angular/router';
import { CreateContractComponent } from './components/create-contract/create-contract.component';
import { UserComponent } from './components/user/user.component';
import { ListingComponent } from './components/listing/listing.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { BindCompanyComponent } from './components/user/bind-company/bind-company.component';


export const routes: Routes = [
    { path: '', component: UserComponent },
    { path: 'user', component: UserComponent },
    { path: 'create-contract', component: CreateContractComponent },
    { path: 'listing', component: ListingComponent },
    { path: 'user/registration', component: RegistrationComponent },
    { path: 'user/company', component: BindCompanyComponent }
];
