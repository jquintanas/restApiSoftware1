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