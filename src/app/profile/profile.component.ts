import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BaseUtilityModule } from '../Modules/base-utility/base-utility.module';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, BaseUtilityModule, HeaderComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  componentTitle: string = 'Profile Page'
  currentUser: any
  isEditMode: boolean = false
  isFormEditable: boolean = true
  openTab: number = 1

  personalInformationForm !: FormGroup

  constructor(private router: Router, private formBuilder: FormBuilder) { }

  personalInformationErrors: any = {
    firstName: {
      required: 'First Name is required'
    },
    lastName: {
      required: 'Last Name is required'
    },
    name: {
      required: 'User Name is required'
    },
    email: {
      required: 'Email is required'
    },
    password: {
      required: 'Password is required'
    },
    phoneNumber: {
      required: 'Phone Number is required'
    },
  }
  ngOnInit(): void {

    this.currentUser = JSON.parse(sessionStorage.getItem('LoggedIn_User') || '{}')
    if (typeof this.currentUser.name === 'undefined') {
      this.currentUser.name = 'Default user'
      this.currentUser.picture = '../../assets/investment.png'
    }
    if (this.currentUser == '{}')
      this.router.navigate(['/'])

    this.initializePersonalInformationForm();

    this.personalInformationForm.disable();
  }

  makeFormEditable()
  {
    debugger;
    this.personalInformationForm.enable();
    this.isFormEditable = !this.isFormEditable;
  }

  initializePersonalInformationForm() {
    this.personalInformationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      phoneNumber: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      occupation: [''],
      company: ['']
    })
  }



  getFormsError(formName: string, controlName: string): string[] {
    debugger;
    if (formName === 'personalInformation') {
      const controlErrors = this.personalInformationForm.get(controlName)?.errors
      if (controlErrors) {
        let keyType = Object.keys(controlErrors);
        return Object.keys(controlErrors).map((key) => this.personalInformationErrors[controlName][key])
      } else {
        console.log(`Key "${controlName}" not found in loanIdentificationErrors`)
        return []
      }
    }
    return [];


  }
}
