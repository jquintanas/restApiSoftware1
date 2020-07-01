/**
 * @interface purchaseInterface
 * @author Francesca Man Ging <fman@espol.edu.ec>
 * @public
 * @version 1.0.0
 * @desc Purchase interface model.
 */

export interface purchaseInterface {
    idcompra?: Number;
    idusuario: Number;
    fechacompra: Date;
    idformaEntrega : String,
    horaEntrega: Date;
    createdAt?: Date;
    updatedAt?: Date;
}