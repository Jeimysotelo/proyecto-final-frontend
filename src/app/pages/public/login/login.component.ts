import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { UsersService } from '../../../services/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.userService.login(email, password).subscribe(
        response => {
          Swal.fire({
            icon: 'success',
            title: 'Login successful!',
            text: 'You have been logged in successfully.',
            confirmButtonText: 'OK'
          }).then(() => {
            this.router.navigate(['/home']); // Redirigir a la página deseada
          });
        },
        error => {
          console.error('Error:', error);
          Swal.fire({
            icon: 'error',
            title: 'Login failed',
            text: 'Invalid email or password. Please try again.',
            confirmButtonText: 'OK'
          });
        }
      );
    }
  }
}
