import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class PacientesService {
  API_URI = environment.MSAPI;
  constructor(private hhtp:HttpClient) { }

  agregarPaciente(datosPaciente:any){
    return this.hhtp.post(`${this.API_URI}/pacientes`, datosPaciente)
  }

  getpacientes(){
    return this.hhtp.get(`${this.API_URI}/pacientes`)
  }

  updatePacientes(datosPaciente: any){
    return this.hhtp.put(`${this.API_URI}/pacientes`, datosPaciente);
  }
  deletePaciente(idPaciente:any){
    return this.hhtp.delete(`${this.API_URI}/pacientes/${idPaciente}`);
  }
}
