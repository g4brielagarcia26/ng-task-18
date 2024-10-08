import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { hasEmailError, isRequired } from '../../utils/validators';
import { AuthService } from '../../data-access/auth.service';
import { Router, RouterLink } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { toast } from 'ngx-sonner';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { GoogleButtonComponent } from '../google-button/google-button.component';

interface FormSignIn {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-sing-up',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, GoogleButtonComponent, MatDialogModule],
  templateUrl: './sing-in.component.html'
})
export default class SingInComponent {

  // Todas las validaciones presentes en el componente provienen de auth/utils/validators.ts
  // Se realizan a parte con la intención de ser reutilizadas.

  // Inyección de dependencias necesarias para el funcionamiento del componente.
  private _formBuilder = inject(FormBuilder); // FormBuilder se usa para crear un grupo de controles de formulario reactivos.
  private _authService = inject(AuthService); // Servicio de autenticación personalizado que maneja las acciones de autenticación.
  private _router = inject(Router); // Router para la navegación entre diferentes rutas en la aplicación.
  private _dialog = inject(MatDialog); // MatDialog para mostrar diálogos modales, como el de crear cuenta.
userExists: any;

  /**
   * Verifica si un campo específico del formulario es requerido y no está completo.
   * @param field - El campo a verificar ('email' o 'password').
   * @returns `true` si el campo está vacío y es requerido, de lo contrario `false`.
   */
  isRequired(field: 'email' | 'password') {
    return isRequired(field, this.form); // Función externa que verifica si el campo es requerido.
  }

  /**
   * Verifica si hay un error en el campo de correo electrónico (por ejemplo, formato inválido).
   * @returns `true` si hay un error en el campo de correo electrónico, de lo contrario `false`.
   */
  hasEmailError() {
    return hasEmailError(this.form); // Función externa que valida si el correo tiene algún error de formato.
  }

  // Definición del formulario reactivo con los campos 'email' y 'password'.
  form = this._formBuilder.group<FormSignIn>({
    email: this._formBuilder.control('', [
      Validators.required, // El campo de correo es obligatorio.
      Validators.email,    // El correo debe tener un formato válido.
    ]),
    password: this._formBuilder.control('', Validators.required), // El campo de contraseña es obligatorio.
  });

  /**
   * Envía el formulario de inicio de sesión si es válido. 
   * Intenta iniciar sesión utilizando el servicio de autenticación con correo y contraseña.
   * Si el inicio de sesión es exitoso, redirige al usuario a la página principal.
   * Si ocurre un error, muestra una notificación al usuario.
   */
  async submit() {
    if (this.form.invalid) return; // Si el formulario es inválido, se detiene la ejecución.

    try {
      // Extrae el email y password del formulario.
      const { email, password } = this.form.value;

      // Si faltan el email o la contraseña, no se realiza el envío.
      if (!email || !password) return;

      // (Opcional) Imprime las credenciales en la consola.
      console.log({ email, password });

      // Llama al servicio de autenticación para iniciar sesión.
      await this._authService.signIn({ email, password });

      toast.success('¡Hola nuevamente!'); // Muestra un mensaje de éxito usando `ngx-sonner`.
      this._router.navigateByUrl('/home'); // Redirige al usuario a la página principal.
    } catch (error) {
      toast.error('Ocurrió un error al iniciar sesión'); // Muestra un mensaje de error en caso de fallo.
    }
  }

  /**
   * Inicia sesión usando la autenticación de Google.
   * Si el inicio de sesión es exitoso, redirige al usuario a la página home.
   * Si ocurre un error, muestra una notificación de error.
   */
  async submitWithGoogle() {
    try {
      // Llama al servicio para iniciar sesión con Google.
      await this._authService.singInWithGoogle();

      toast.success('¡Bienvenido de nuevo!'); // Muestra un mensaje de éxito al usuario.
      this._router.navigateByUrl('/home'); // Redirige al usuario a la página de tareas.
    } catch (error) {
      toast.error('Ocurrió un error.'); // Muestra un mensaje de error si la autenticación falla.
    }
  }

  /**
   * Abre un diálogo modal para permitir al usuario crear una nueva cuenta.
   * Utiliza el componente `SignUpComponent` y define el tamaño del diálogo.
   */
  openCreateAccountDialog() {
    const dialogRef = this._dialog.open(SignUpComponent, {
      width: '460px', // Ancho del diálogo.
      height: 'fill'  // El diálogo ocupará toda la altura de la pantalla.
    });
  }

} // :)

