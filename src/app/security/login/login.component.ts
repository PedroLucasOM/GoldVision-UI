import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted = false;

  constructor(private auth: AuthService) {
  }

  ngOnInit() {
  }

  login(form: NgForm) {
    this.auth.login(form.controls.email.value, form.controls.senha.value).then(data => {
      console.log(data);
    }).catch(error => {
      console.log(error);
    });
  }

}
