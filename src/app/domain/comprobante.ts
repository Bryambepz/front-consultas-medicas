import { Colaboradores } from "./colaboradores";

export class Comprobantes{
    id:string='';
    numero?:number;
    fecha: Date = new Date();
    observacion:string='';
    iva:number=0.0;
    subTotal:number=0;
    total:number=0;
    estado:string = 'Generada'
    detalles:any;
    paciente:Colaboradores = new Colaboradores();
    transacciones:any;
}