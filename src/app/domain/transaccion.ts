import { Comprobantes } from "./comprobante";

export class Transacciones{
    id:string='';
    fecha:Date = new Date();
    asunto:string='';
    tipo:string='';
    monto:number = 0;
    comprobante: Comprobantes = new Comprobantes();
}