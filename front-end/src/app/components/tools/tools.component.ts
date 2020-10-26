import { Component, OnInit } from '@angular/core';
import { strict } from 'assert';
import Swal from 'sweetalert2/dist/sweetalert2.js'


@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styles: [
  ]
})
export class ToolsComponent implements OnInit {

  constructor() { }
  private dataUser = JSON.parse(localStorage.getItem('info'));
  network_user: string = ''
  document: string = ''
  TPbookURL =  "https://tpbookns.teleperformance.co";
  TParcadeURL = "https://teleperformance.thetrainingarcade.com/games/recall/shopper-admin-profile?token=yGzEnIP3BkZD1J4rjpTxiUXmoeNca0FV";
  TPsimulation = "http://traininglab.azurewebsites.net/sunrun/_files/player.htm#FS=1"

  TPsimulationBool = false;
  TPArcadeBool = false;
  TPBookBool = false;

  ngOnInit(): void {
    this.setTools()
  }

  setTools(){
    if(this.dataUser.TPArcade){
      if(this.dataUser.TPArcade.length > 0){
        this.TPArcadeBool = true;
      }
    }

    if(this.dataUser.TPSimulation){
      if(this.dataUser.TPSimulation.length > 0){
        this.TPsimulationBool = true
      }
    }
    if(this.dataUser.TPBook == true){
      this.TPBookBool = true;
    }
  }

  // @ts-ignore
  go_to_TPbook(){
    this.network_user = 'cliente.test';
    this.document = 'Colombia2020*';
    let tpbook_site =  window.open(this.TPbookURL+"/?user=" + `${this.network_user}` + "&pass=" + `${this.document}` , '_blank',)
    //window.open("https://tpbook.teleperformance.co/?user=" + `${this.network_user}` + "&pass=" + `${this.document}` , '_self')
    setTimeout( function () { tpbook_site.location.href = "https://tpbookns.teleperformance.co" ; }, 3500);

  }

  async go_to_TPsimulation() {
    let Simulations  = {};
    for (let i = 0; i< this.dataUser.TPSimulation.length; i++){
      Simulations[this.dataUser.TPSimulation[i]['Simulation_Name']] = this.dataUser.TPSimulation[i]['Simulation_Name']
    }
    const {value: simulation} = await Swal.fire({
      title: 'Select your simulation',
      input: 'select',
      inputOptions: Simulations,
      confirmButtonText: "Go",
      inputPlaceholder: 'Select a simulation',
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value) {
            for (let i = 0; i< this.dataUser.TPArcade.length; i++){
              if(this.dataUser.TPSimulation[i].Simulation_Name.includes(value)){
                window.open(this.dataUser.TPSimulation[i].Simulation_Link, "_blank")
              }
            }
            //let tpsimulation_site = window.open(this.TPsimulation, "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes")
            Swal.close();
            resolve();
          } else {
            resolve('You need to select one')
          }
        })
      }
    })
  }

  async go_to_TParcade() {
    let Games  = {};
    for (let i = 0; i< this.dataUser.TPArcade.length; i++){
      Games[this.dataUser.TPArcade[i]['Arcade_Game_Name']] = this.dataUser.TPArcade[i]['Arcade_Game_Name']
    }
    console.log( this.dataUser.TPArcade.length)
    const {value: game} = await Swal.fire({
      title: 'Select your game',
      input: 'select',
      inputOptions: Games,
      width: '28rem',
      confirmButtonText: "Go",
      inputPlaceholder: 'Select a game',
      showCancelButton: true,
      position: 'center',
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if(value){
            for (let i = 0; i< this.dataUser.TPArcade.length; i++){
              if(this.dataUser.TPArcade[i].Arcade_Game_Name.includes(value)){
                console.log("??")
                window.open(this.dataUser.TPArcade[i].Arcade_Link, "_blank")
              }
            }
            //
            Swal.close();
            resolve();
          }else {
            resolve('You need to select one')
          }
        })
      }
    })
  }

}
