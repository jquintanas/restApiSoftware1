/**
 * @interface pagosInterface
 * @author Jonathan Quintana <jiquinta@espol.edu.ec>
 * @public
 * @version 1.0.0
 * @desc Interfaz para modelo novedad.
 */
export interface novedadinterface {
    idnovedad?: Number;
    idusuarioReporta: string;
    idusuarioReportado: string;
    descripcion: string;
    createdAt?: Date;
    updatedAt?: Date;
}