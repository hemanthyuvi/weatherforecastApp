import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userItems: MenuItem[];
  User: string;
  constructor(
    private router: Router
  ) { 
    this.userItems = [
      {
          label: 'Options',
          items: [{
              label: 'Logout',
              icon: 'pi pi-sign-out',
              command: () => {
                this.logout();
              }
          }
      ]}
  ];
  }

  ngOnInit(): void {
    this.User = localStorage.getItem('username');
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

}
