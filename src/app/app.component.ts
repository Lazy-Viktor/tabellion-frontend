import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentView: 'users' | 'create-contract' | 'contracts' = 'users';

  setView(view: 'users' | 'create-contract' | 'contracts') {
    this.currentView = view;
  }
}

