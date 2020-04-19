/**
 * @interface pagosInterface
 * @author Jonathan Quintana <jiquinta@espol.edu.ec>
 * @public
 * @version 1.0.0
 * @desc Interfaz para modelo pago.
 */
export interface pagosInterface {
    idPago?: Number;
    idformaPago: Number;
    total: Number;
    imagen: string;
    createdAt?: Date;
    updatedAt?: Date;
}