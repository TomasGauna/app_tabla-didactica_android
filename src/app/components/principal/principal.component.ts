import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
})
export class PrincipalComponent  implements OnInit {
  
  mostrarDiv = 'ganado';
  idiomaElegido = 'es';
  mostrarSpinner = false;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {}

  cambiarIdioma(idioma: string)
  {
    this.mostrarSpinner = true;
    setTimeout(()=>{
      this.mostrarSpinner = false;
      this.idiomaElegido = idioma;
    }, 1000);
  }

  cambiarTema(tema: string)
  {
    this.mostrarSpinner = true;
    setTimeout(()=>{
      this.mostrarSpinner = false;
      this.mostrarDiv = tema;
    }, 1000);
  }

  cerrarSesion()
  {
    this.mostrarSpinner = true;
    this.auth.logout()
      ?.then(() =>
      {
        console.log("redireccionando...");
        setTimeout(()=>{
          this.mostrarSpinner = false;
          this.router.navigate(['/login']);
        }, 1500);
      })
      .catch(error =>
      {
        setTimeout(()=>{
          console.log(error);
        }, 1500);
      });
  }

  async speakText(mensaje: string)
  {
    try
    {
      if(this.idiomaElegido === 'en-US')
      {
        switch(mensaje)
        {
          case 'caballo':
            mensaje = 'horse';
          break;
          case 'cerdo':
            mensaje = 'pig';
          break;
          case 'gato':
            mensaje = 'cat';
          break;
          case 'gallina':
            mensaje = 'hen';
          break;
          case 'perro':
            mensaje = 'dog';
          break;
          case 'tortuga':
            mensaje = 'turtle';
          break;


          case 'cero':
            mensaje = 'zero';
          break;
          case 'uno':
            mensaje = 'one';
          break;
          case 'dos':
            mensaje = 'two';
          break;
          case 'tres':
            mensaje = 'three';
          break;
          case 'cuatro':
            mensaje = 'four';
          break;
          case 'cinco':
            mensaje = 'five';
          break;


          case 'azul':
            mensaje = 'blue';
          break;
          case 'amarillo':
            mensaje = 'yellow';
          break;
          case 'rojo':
            mensaje = 'red';
          break;
          case 'verde':
            mensaje = 'green';
          break;
          case 'celeste':
            mensaje = 'light blue';
          break;
          case 'violeta':
            mensaje = 'violet';
          break;
        }
      }
      else
      {
        if(this.idiomaElegido === 'pt')
        {
          switch(mensaje)
          {
            case 'caballo':
              mensaje = 'cavalo';
            break;
            case 'cerdo':
              mensaje = 'porco';
            break;
            case 'gallina':
              mensaje = 'galinha';
            break;
            case 'perro':
              mensaje = 'cachorro';
            break;
            case 'tortuga':
              mensaje = 'tartaruga';
            break;

            case 'cero':
            mensaje = 'zero';
            break;
            case 'uno':
              mensaje = 'um';
            break;
            case 'dos':
              mensaje = 'dois';
            break;
            case 'tres':
              mensaje = 'três';
            break;
            case 'cuatro':
              mensaje = 'quatro';
            break;


            case 'amarillo':
              mensaje = 'amarelo';
            break;
            case 'rojo':
              mensaje = 'vermelho';
            break;
            case 'celeste':
              mensaje = 'céu azul';
            break;
            case 'violeta':
              mensaje = 'tolet';
            break;

          }
        }
      }

        TextToSpeech.speak(
        {
          text: mensaje,
          lang: this.idiomaElegido,
          rate: 1.0
        });
    }
    catch
    {
      console.log("Error...");
    }
  }
}
