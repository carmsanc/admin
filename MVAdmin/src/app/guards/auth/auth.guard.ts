import { ifStmt } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../../services/usuario/usuario.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  tipo_user: any;
  constructor(
    private auth: UsuarioService,
    private router: Router
  ){ 
    
   }
  canActivate(): boolean{
    if(this.auth.isAuthenticated()){
      this.tipo_user =  localStorage.getItem('tipo_user');
      if(this.tipo_user == 'ha'){
        return true;
      }
      else if(this.tipo_user == 'su'){
        return true;
      }
      else {
        return true;
      }
    }
    else{
      console.log("Hola")
      this.router.navigate(['/login']);
      return false;
    }
    
  }
  
}
