import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../../services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UsersService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      role: ['client'] // Se establece el rol como 'client' por defecto
    }, { 
      validators: this.passwordMatchValidator 
    });
  }

  // Custom validator to check if passwords match
  passwordMatchValidator(form: FormGroup): { [key: string]: boolean } | null {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { 'mismatch': true };
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { confirmPassword, ...user } = this.registerForm.value; // Excluye confirmPassword
      this.userService.register(user).subscribe(
        response => {
          Swal.fire({
            icon: 'success',
            title: 'Registration successful!',
            text: 'You have been registered successfully.',
            confirmButtonText: 'OK'
          }).then(() => {
            this.registerForm.reset()
            // Puedes redirigir a otra página si lo deseas
            // this.router.navigate(['/login']);
          });
        },
        error => {
          console.error('Error:', error);
          Swal.fire({
            icon: 'error',
            title: 'Registration failed',
            text: 'An error occurred while registering. Please try again.',
            confirmButtonText: 'OK'
          });
        }
      );
    }
  }
}
