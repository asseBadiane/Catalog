import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  userFormGroup!: FormGroup;
  errorMessage!: any;

  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService, private router: Router) { }
  ngOnInit(){
    this.userFormGroup = this.formBuilder.group({
      username: this.formBuilder.control(''),
      password: this.formBuilder.control('')
    })
  }

  handleLogin(){
    let username = this.userFormGroup.value.username;
    let password = this.userFormGroup.value.password;
    this.authenticationService.login(username, password).subscribe({
      next: (user) => {
        this.authenticationService.authenticatedUser(user).subscribe({
          next: (data) => {
            this.router.navigateByUrl('/products');
          },
          error: (error) => {
            this.errorMessage = error;
          }
        });
      },
      error: (error) => {
       this.errorMessage = error
      }
    })
  }
}
