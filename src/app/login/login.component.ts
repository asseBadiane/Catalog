import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  userFormGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }
  ngOnInit(){
    this.userFormGroup = this.formBuilder.group({
      username: this.formBuilder.control(''),
      password: this.formBuilder.control('')
    })
  }

  handleLogin(){
    console.log(this.userFormGroup.value);
  }

}
