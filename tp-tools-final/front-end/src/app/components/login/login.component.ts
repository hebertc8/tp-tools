import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from "../../services/api.service";
import { userModel } from "../../models/user.model";
import { CookieService } from "ngx-cookie-service";
import  { Router, ActivatedRoute  } from "@angular/router";
import { soapService } from "../../services/soap.service.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  user = new userModel()
  cargando = false;
  datos_incorrectos = false;
  form: FormGroup;
  //ingresar_email = false;
  //private directorio_activo: boolean
  //private parser: DOMParser;
  //private xmlDoc: Document;

  constructor(private fb: FormBuilder, private apiService: ApiService, private coookieService: CookieService, private route: Router ) { 

    this.form = fb.group({
      user: [null, Validators.required],
      password: [null, Validators.required],
    });

  }

  ngOnInit(): void {
  }

  login(valid){
    if (valid){
      this.cargando = true;
      this.datos_incorrectos = false;
      const input = this.form.value;
      const LoginData = {
        user: input.user,
        pass: input.password
      };
      this.apiService.login(LoginData).subscribe((resp: any) => {
        if (resp.message){

        } else {
          this.apiService.setUser(resp);
          this.coookieService.set('tp_cookie', resp.token, 1 );
          this.getDataUser(resp);
        }
      },
      err => {
        console.log(err);
        this.cargando = false;
        this.datos_incorrectos = true;
      })
    }

     /*
      *
       this.soapService.soap_auth(network_id, password)
        .subscribe((resp) => {
          this.parser = new DOMParser()
          this.xmlDoc = this.parser.parseFromString(resp, "text/xml")
          this.directorio_activo = eval(this.xmlDoc.getElementsByTagName("boolean")[0].childNodes[0].nodeValue)
          console.log(this.directorio_activo)
        })
      *
      * */
  }
  getDataUser(Resp){
    this.apiService.getDataUser(Resp.idccms).subscribe( resp => {
      Resp.document = resp[0]['CC']
      Resp.campaign = resp[0].Campaign
      this.apiService.setUser(Resp);
      this.getTPtoolsData(resp[0].Campaign);
      //this.getTPtoolsData('Sunrun');
    },
    err => {
      console.log(err);
      this.cargando = false;
      this.datos_incorrectos = true;
    })
  }

  getTPtoolsData(campaign){
    this.apiService.getToolsPerCampaign(campaign).subscribe( resp => {
      let dataTPArcade = [];
      let dataTPSimulation = [];
      let dataTPBook = false;
      let dataUser = JSON.parse(localStorage.getItem('info'));
      for(let item in resp){
        if(resp[item]['Arcade'] == 'True'){
          let arcade: {[k: string]: any} = {};
          arcade.Arcade = resp[item]['Arcade']
          arcade.Arcade_Game_Name =  resp[item]['Arcade_Game_Name']
          arcade.Arcade_Link = resp[item]['Arcade_Link']
          dataTPArcade.push(arcade)
        }
        if(resp[item]['Simulation'] == 'True'){
          let simulations: {[k: string]: any} = {};
          simulations.Simulation = resp[item]['Simulation']
          simulations.Simulation_Link = resp[item]['Simulation_Link']
          simulations.Simulation_Name = resp[item]['Simulation_Name']
          dataTPSimulation.push(simulations)
        }
        if(resp[item]['Book'] == 'True'){
          dataTPBook = true;
        }
      }
      dataUser.TPBook = dataTPBook;
      dataUser.TPArcade = dataTPArcade;
      dataUser.TPSimulation = dataTPSimulation;
      this.apiService.setUser(dataUser);
      this.route.navigate(['home'])
    })
  }

  /*
  *
  completar_registro(email:string, document:string){


    if (email.length > 0 ){
      this.cargando = true;
      this.datos_incorrectos = false;
      this.loginservice.save_email_service(email, document, this.user.network_user)
        .subscribe((resp) => {
          if ("token" in resp){
            this.coookieService.set('tp_cookie', resp.token, 1 );
            this.user.email = resp.email;
            this.user.document = resp.document;

            localStorage.setItem('network_user', this.user.network_user);
            localStorage.setItem('document', this.user.document);
            localStorage.setItem('email', this.user.email);

            this.cargando = false;
            this.datos_incorrectos = false;
            this.route.navigate(['tools'])
          }
        })
    } else {
      this.datos_incorrectos = true
    }
  }
  *
  * */


}
