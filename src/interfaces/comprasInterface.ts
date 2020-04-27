/**
 * @interface comprasInterface
 * @author Francesca Man Ging <fman@espol.edu.ec>
 * @public
 * @version 1.0.0
 * @desc Interfaz para modelo compras.
 */

export interface comprasInterface {
    idcompra?: Number;
    idusuario: Number;
    fechacompra: Date;
    idformaEntrega : String,
    horaEntrega: Date;
    createdAt?: Date;
    updatedAt?: Date;
}