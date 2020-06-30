/**
 * @interface NoveltyInterface 
 * @author Jonathan Quintana <jiquinta@espol.edu.ec>
 * @public
 * @version 1.0.0
 * @desc Novelty interface model.
 */
export interface NoveltyInterface {
    idnovedad?: Number;
    idusuarioReporta: string;
    idusuarioReportado: string;
    descripcion: string;
    createdAt?: Date;
    updatedAt?: Date;
}