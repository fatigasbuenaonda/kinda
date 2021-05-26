import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserI } from '../../models/user';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  regerr = false;
  regerrMes = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onRegister(form: { value: UserI; }): void{
    console.log('Register', form.value);
    this.authService.register(form.value).subscribe(
      res => {this.router.navigateByUrl('/auth/login'); },
      err => {console.log('HTTP Error', err.error);
              this.regerr = true;
              this.regerrMes = err.error; });
  }

}
