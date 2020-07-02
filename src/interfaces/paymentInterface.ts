/**
 * @interface PaymentInterface
 * @author Jonathan Quintana <jiquinta@espol.edu.ec>
 * @public
 * @version 1.0.0
 * @desc Payment interface model.
 */
export interface PaymentInterface {
    idPago?: Number;
    idformaPago: Number;
    total: Number;
    imagen: string;
    createdAt?: Date;
    updatedAt?: Date;
}