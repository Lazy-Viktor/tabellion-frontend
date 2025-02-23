import { Routes } from '@angular/router';
import { ContractsComponent } from './components/contracts/contracts.component';
import { CreateContractComponent } from './components/create-contract/create-contract.component';
import { UsersComponent } from './components/user/user.component';

export const routes: Routes = [
    { path: '', component: ContractsComponent },
    { path: 'add-user', component: UsersComponent },
    { path: 'create-contract', component: CreateContractComponent },
    { path: 'view-contracts', component: ContractsComponent },
];
