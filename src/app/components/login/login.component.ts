import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
//import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {
  usuarios: any[] = [];
  formValido = true;
  mostrarSpinner = false;
  email = '';
  clave = '';
  mensajeError = '';
  usuarioElegido = '';
  
  constructor(private firestore: Firestore, private router: Router, private auth: AuthService) {}

  ngOnInit() 
  {
    this.usuarioElegido = 'ninguno';
  }

  ingresar()
  {
    this.mostrarSpinner = true;
    this.auth.login(this.email, this.clave)
      ?.then(response =>
      {
        console.log("redireccionando...");
        this.email = '';
        this.clave = '';
        this.usuarioElegido = 'ninguno';
        setTimeout(()=>{
          this.mostrarSpinner = false;
          this.router.navigate(['/principal']);
        }, 1500);
        
      })
      .catch(error =>
      {
        setTimeout(()=>{
          this.mostrarSpinner = false;
          console.log(error);
          this.formValido = false;
          switch(error.code)
          {
            case 'auth/invalid-email':
              this.mensajeError =  "Correo inválido.";
            break;
            case 'auth/missing-password':
              this.mensajeError = "Contraseña inválida.";
            break;
            case 'auth/invalid-login-credentials':
              this.mensajeError = 'Correo y/o contraseña incorrectos.';
            break;
          }
        }, 1500);
      });
  }

  cambiarSeleccion()
  {
    switch(this.usuarioElegido)
    {
      case 'admin':
        this.email = 'admin@admin.com';
        this.clave = '111111'; 
      break;
      case 'invitado':
        this.email = 'invitado@invitado.com';
        this.clave = '222222'; 
      break;
      case 'usuario':
        this.email = 'usuario@usuario.com';
        this.clave = '333333'; 
      break;
      case 'anonimo':
        this.email = 'anonimo@anonimo.com';
        this.clave = '444444'; 
      break;
      case 'tester':
        this.email = 'tester@tester.com';
        this.clave = '555555'; 
      break;
      case 'ninguno':
        this.email = '';
        this.clave = ''; 
      break;
    }
  }

  reiniciarCampos()
  {
    this.mensajeError = '';
    this.email = '';
    this.clave = '';
    this.formValido = true;
  }
}
