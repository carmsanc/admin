import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { ComunicateNavSiderService } from '../../services/comunicatens/comunicate-nav-sider.service';
import { UsuarioService } from '../../services/usuario/usuario.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { CamposantoService } from 'src/app/services/servicios.index';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  nameUsuario: string = 'Administrador';
  tipoUsuario: string = 'Administrador'
  id: any;
  isCollapsed = false;
  loggeduser = false;
  nombreCamposanto: String = "";
  nombreEmpresa: String = "";
  constructor(
    private comunicateNSService: ComunicateNavSiderService,
    private _usuario: UsuarioService,
    private router: Router,
    private _servCamposanto: CamposantoService
  ) { }

  ngOnInit(): void {
    this.id = JSON.stringify(localStorage.getItem('id'));
    let camposanto = JSON.parse(localStorage.getItem('camposanto'))
    this.setNombreCamposanto(camposanto);
    this.setNombreEmpresa(camposanto);
    this.setRolUser();
    //this.getUser();
    
  }

  setRolUser(){
    let tipo = localStorage.getItem('tipo_user');
    if(tipo == 'ha'){
      this.tipoUsuario = 'Hyper Administrador';
    }
    else if(tipo == 'su'){
      this.tipoUsuario = 'Super Administrador'
    }
    else if(tipo == 'ad'){
      this.tipoUsuario = 'Administrador'
    }
    this.getStatus();
    this.nameUsuario = localStorage.getItem('username');
    console.log(this.loggeduser)
  }
  cambiar() {
    this.comunicateNSService.toggle();
    let shand = document.getElementsByClassName('contenido') as HTMLCollectionOf<HTMLElement>;
    if (this.isCollapsed == true) {
      shand[0].style.marginLeft = "80px";
    } else {
      shand[0].style.marginLeft = "200px";
    }
  }

  setNombreCamposanto(camposanto){
    let idCamposanto = camposanto['camposanto'];
    this._servCamposanto.getCamposantoByID(idCamposanto).subscribe(
      (resp) => {
        this.nombreCamposanto = resp['nombre'];
      }
    )
  }

  setNombreEmpresa(camposanto){
    let idEmpresa = camposanto['empresa'];
    this._servCamposanto.getEmpresa(idEmpresa).subscribe(
      (resp) => {
        this.nombreEmpresa = resp['nombre'];
      }
    )
  }
  getUser() {
    this._usuario.getUserId(this.id.user_id)
      .subscribe((resp: any) => {
        console.log(resp)
      }
      )
  }
  getStatus() {
    this.loggeduser = this._usuario.isLoggedin;
    return this.loggeduser;
  }

  logged() {
    this.loggeduser = this._usuario.isLoggedin;
  }

  logout() {
    Swal.fire({
      title: '¿Está seguro que desea salir?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          '¡Se ha cerrado sesión!',
          'Sesión cerrada exitosamente'
        )
        this._usuario.logoutUser();
        this.getStatus();
        this.router.navigate(['/login'])
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'El cierre de sesión se ha cancelado'
        )
      }
    })
  }
}