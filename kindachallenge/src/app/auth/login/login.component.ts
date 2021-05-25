import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserI } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logerr = false;
  logerrMes = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(form: { value: any; }): void{
    console.log('Login', form.value);
    this.authService.login(form.value).subscribe(
      res => {this.router.navigateByUrl('/maps'); },
      err => {console.log('HTTP Error', err.error.message);
              this.logerr = true;
              this.logerrMes = err.error.message; });
    }
}
