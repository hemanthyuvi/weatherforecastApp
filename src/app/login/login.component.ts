import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    loginId: new FormControl('user@mobiquity.com', [Validators.required, Validators.email]),
    password: new FormControl('user@123', Validators.required)
  });

  constructor(
    private router: Router,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig
  ) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  onSubmit(){
    if(this.loginForm.value.loginId == "user@mobiquity.com" && this.loginForm.value.password == "user@123" ){
      localStorage.clear();
      localStorage.setItem('login', 'success');
      localStorage.setItem('username', this.loginForm.value.loginId);
      this.router.navigate(['homepage']);
    }else{
      this.messageService.add({key: 'bc', severity:'error', summary: 'Failed', detail: 'Please check your login credentials!'});
    }
  }

}
