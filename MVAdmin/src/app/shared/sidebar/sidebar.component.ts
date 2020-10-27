import { Component, OnInit } from '@angular/core';
import { ComunicateNavSiderService } from '../../services/comunicatens/comunicate-nav-sider.service';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faListAlt } from '@fortawesome/free-solid-svg-icons';
import { faAnkh } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isCollapsed: boolean = false;
  isHyperAdmin: boolean = false;
  faBell = faBell;
  faBoxOpen =  faBoxOpen;
  faListAlt = faListAlt;
  faUserCircle = faUserCircle;
  faAnkh = faAnkh;
  emailUser: String = ""
  constructor(
    private comunicateNSService: ComunicateNavSiderService,
    private router: Router,
    private _serviceUser : UsuarioService
  ) {
    
   }

  ngOnInit(): void {
    let username = localStorage.getItem('username');
    this.comunicateNSService.change.subscribe(isOpen => {
      this.isCollapsed = isOpen;
    });
    
    this.validateHyper(username);
  }

  validateHyper(username){
    this._serviceUser.getDatosUser(username).subscribe(
      (resp) => {
        this.emailUser = resp['email']
        if(resp['tipo_usuario'] == 'ha'){
          this.isHyperAdmin = true;
        }
      }
    )
  }
  inicioPage(){
    let camposanto = JSON.parse(localStorage.getItem('camposanto'))
    let id = camposanto['camposanto']
    this.router.navigate(['/inicio/perfil', id])
  }
}
