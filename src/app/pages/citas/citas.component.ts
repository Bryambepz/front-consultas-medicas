import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Citas } from 'src/app/domain/citas';
import { Colaboradores } from 'src/app/domain/colaboradores';
import { ServCitasService } from 'src/app/services/Citas-Service/serv-citas.service';
import { ServMedicoService } from 'src/app/services/Medicos-Service/serv-medico.service';
import { ServPacienteService } from 'src/app/services/Paciente-Service/serv-paciente.service';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss'],
})
export class CitasComponent implements OnInit {
  lista_pacientes: Colaboradores[] = [];
  lista_medicos: Colaboradores[] = [];
  lista_citas: Citas[] = [];
  fechaE: string[] = [];
  fechaS: string[] = [];

  fechaEntradaAct: string = '';
  fechaSalidaAct: string = '';

  newcita: Citas = new Citas();
  cedula:string = '';
  medicoS: boolean = false;
  pacienteS: boolean = false;
  actualizar: boolean = false;
  agendarCita: boolean = true;

  constructor(
    private servPacientes: ServPacienteService,
    private servMedicos: ServMedicoService,
    private servCitas: ServCitasService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    if (localStorage.getItem('id') == '' || localStorage.getItem('rol') == '') {
      window.location.href = '/login';
    }

    let accionCita;
    this.route.queryParams.subscribe((params) => {
      accionCita = params['cita']; // { order: "popular" }
    });

    if (accionCita == 'agendar') {
      this.servPacientes.getPacientes().subscribe((d) => {
        this.lista_pacientes = d.body!;
      });
      this.servMedicos.getMedicos().subscribe((d) => {
        this.lista_medicos = d.body!;
      });
      this.agendarCita = true;
    } else {
      this.servCitas.getCitas().subscribe((d) => {
        d.body!.forEach((f) => {
          let date: Date = new Date(f.fechaHoraEntrada);
          this.fechaE.push(
            date.toLocaleDateString() + '  ' + date.toLocaleTimeString()
          );
          let dateS: Date = new Date(f.fechaHoraSalida);
          this.fechaS.push(
            dateS.toLocaleDateString() + '  ' + dateS.toLocaleTimeString()
          );
        });
        this.lista_citas = d.body!.sort((a, b) =>
          a.estado.localeCompare(b.estado)
        );
      });
      this.agendarCita = false;
    }
  }

  cita() {
    this.newcita.estado = 'Registrada';
    this.servMedicos.getMedicos().subscribe((d) => {
      d.body!.forEach((m) => {
        if (m.cedula == this.newcita.medico) {
          this.servPacientes.getPacientes().subscribe((p) => {
            p.body!.forEach((p) => {
              if (this.newcita.paciente == p.cedula) {
                this.newcita.medico = m;
                this.newcita.paciente = p;
                this.servCitas
                  .crear(this.newcita)
                  .subscribe((d) => {
                    d.status == 201 && d.statusText == 'Created'
                      ? window.alert('Cita registrada')
                      : window.alert('Hubo un problema intente mas tarde')
                    window.location.href = "citas?cita=listar"
                  }
                  );
              }
            });
          });
        }
      });
    });
  }

  eliminiar(idCita: string) {
    console.log(idCita);
    this.servCitas.eliminar(idCita).subscribe((d) => {
      console.log(d);
      if(d.status == 200 && d.statusText == 'OK'){
        window.alert("Se elimino la cita")
        window.location.reload();
      }else{
        window.alert("Hubo un problema intelo mas tarde")
      }
    })
  }

  editar(idCita: string) {
    if (!this.actualizar) {
      this.servMedicos.getMedicos().subscribe((d) => (this.lista_medicos = d.body!));
      this.servPacientes.getPacientes().subscribe((d) => (this.lista_pacientes = d.body!));
      this.servCitas.getCitasId(idCita).subscribe((d) => {   
        d.body!.filter((f) => {
          if(f.id == idCita){
            this.newcita = f;
          }
        })
        
        this.newcita.medico = this.newcita.medico.cedula;
        this.newcita.paciente = this.newcita.paciente.cedula;

        let date: Date = new Date(this.newcita.fechaHoraEntrada);
        let split = date.toLocaleDateString().split('/');
        let mont = split[1].length == 1 ? '0' + split[1] : split[1];
        let day = split[0].length == 1 ? '0' + split[0] : split[0];
        let hor = date.getHours().toString().length == 1 ? '0' + date.getHours() :date.getHours();
        let min = date.getMinutes().toString().length == 1 ? '0' + date.getMinutes() :date.getMinutes();
        let sec = date.getSeconds().toString().length == 1 ? '0' + date.getSeconds() :date.getSeconds();

        this.fechaEntradaAct = split[2] + '-' + mont + '-' + day + 'T' +
                  hor + ':' + min + ':' + sec + '.' + date.getMilliseconds();

        date = new Date(this.newcita.fechaHoraSalida);
        split = date.toLocaleDateString().split('/');
        mont = split[1].length == 1 ? '0' + split[1] : split[1];
        day = split[0].length == 1 ? '0' + split[0] : split[0];
        hor = date.getHours().toString().length == 1 ? '0' + date.getHours() :date.getHours();
        min = date.getMinutes().toString().length == 1 ? '0' + date.getMinutes() :date.getMinutes();

        sec = date.getSeconds().toString.length == 1 ? '0' + date.getSeconds() : date.getSeconds();
        this.fechaSalidaAct = split[2] + '-' + mont + '-' + day + 'T' +
        hor + ':' + min + ':' + sec + '.' + date.getMilliseconds();

      });
      this.actualizar = true;
    } else {
      this.servMedicos.getMedicos().subscribe((d) => {
        d.body!.forEach((m) => {
          if (m.cedula == this.newcita.medico) {
            this.servPacientes.getPacientes().subscribe((p) => {
              p.body!.forEach((p) => {
                if (this.newcita.paciente == p.cedula) {
                  this.newcita.medico = m;
                  this.newcita.paciente = p;
                  this.newcita.fechaHoraEntrada = new Date(this.fechaEntradaAct);
                  this.newcita.fechaHoraSalida = new Date(this.fechaSalidaAct);
                  console.log(this.newcita);
                  
                  this.servCitas.actualizar(this.newcita).subscribe((d) => {
                    d.status == 200 && d.statusText == 'OK'
                    ? window.alert('Cita Actualizada')
                    : window.alert('Hubo un problema intente mas tarde')
                    this.actualizar = false;
                    window.location.reload();

                  });                  
                }
              });
            });
          }
        });
      });
      
      
    }
  }

  citasCedula(){
    this.servCitas.getCitas().subscribe((d) => {
      this.lista_citas = [];
      d.body?.forEach((f) => {
        if(f.estado == 'Finalizada' || f.estado == 'Cancelada' || f.estado == 'Pendiente'){
          if(f.paciente.cedula.includes(this.cedula)){
            this.lista_citas.push(f);
          }                
        }
      });
      
    })
  }

}
