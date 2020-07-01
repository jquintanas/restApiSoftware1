/**
 * @interface ordersInterface
 * @author Danny Rios <dprios@espol.edu.ec>
 * @public
 * @version 1.0.0
 * @desc Order interface model.
 */
export interface ordersInterface{
    idpedido?: Number;
    idcompra: Number;
    idproducto: Number;
    cantidad: Number;
    subtotal: Number;
    cubiertos: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}