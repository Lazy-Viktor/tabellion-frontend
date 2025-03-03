import { Component } from '@angular/core';
import { ClientsComponent } from '../listing/clients/clients.component';
import { ContractsComponent } from '../listing/contracts/contracts.component';

@Component({
  selector: 'app-listing',
  standalone: true,
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css'],
  imports: [ClientsComponent, ContractsComponent],
})
export class ListingComponent {
  activeComponent: 'clients' | 'contracts' = 'clients';
}
