
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';


@Component({ 
  standalone:true,
  selector: 'app-login', 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports:[CommonModule, ReactiveFormsModule]
})
export class LoginComponent implements OnInit {
  //private fb = inject(FormBuilder);
  //private _authService = inject(AuthService);
  loginForm!: FormGroup;
  constructor(private router: Router, private fb:FormBuilder, private _authService: AuthService) { 

 
  }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {

    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value as { email: string; password: string };

      
     this._authService.login(email, password).subscribe({
      next: () => this.router.navigate(['/admin']),
      error: err => alert('Login failed')
    });
    }
  }
}
