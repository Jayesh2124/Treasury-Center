declare var google: any;
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule, CommonModule, MatFormFieldModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  eyeIcon = faEye
  loginForm !: FormGroup


  isLoginFormActive: boolean = false;
  @ViewChild('loginPassword') passwordField !: ElementRef<HTMLElement>
  @ViewChild('LoginForm') LoginForm !: ElementRef<HTMLElement>
  @ViewChild('RegisterForm') RegisterForm !: ElementRef<HTMLElement>

  constructor(private router: Router, private fb: FormBuilder, private snakeBar: MatSnackBar) { }

  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: '105808960816-jol0cp6hpc3nd4bsdcqnmh4uj1e7i52s.apps.googleusercontent.com',
      callback: (resp: any) => {
        this.handelLogin(resp);
      }
    })

    google.accounts.id.renderButton(
      document.getElementById("google-btn"),
      {
        theme: 'outline',
        size: 'large',
        shape: 'rectangle',
        width: 100
      }
    )

    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  viewPassword() {
    debugger;
    let element = this.passwordField.nativeElement
    if (element.getAttribute('type') == 'password')
      element.setAttribute('type', 'text')
    else
      element.setAttribute('type', 'password')

    setTimeout(() => {
      element.setAttribute('type', 'password')
    }, 2000)
  }

  private decodeToken(token: string) {
    return JSON.parse(atob(token.split(".")[1]));
  }

  handelLogin(Response: any) {
    const payload = this.decodeToken(Response.credential);
    sessionStorage.setItem('LoggedIn_User', JSON.stringify(payload));
    this.snakeBar.open('Your Login is Successful!!', 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
    this.router.navigate(['Dashboard']);
  }

  Login() {
    debugger;
    console.log(this.loginForm.value);
    this.snakeBar.open('Your Login is Successful!!', 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
    this.router.navigate(['Dashboard']);
  }
}
