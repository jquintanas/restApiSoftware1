/**
 * @interface pedidosInterface
 * @author Danny Rios <dprios@espol.edu.ec>
 * @public
 * @version 1.0.0
 * @desc Interfaz para modelo pedidos.
 */
export interface pedidosInterface{
    idpedido?: Number;
    idcompra: Number;
    idproducto: Number;
    cantidad: Number;
    subtotal: Number;
    cubiertos: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}