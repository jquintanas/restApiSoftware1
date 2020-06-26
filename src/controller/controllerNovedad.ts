import { Request, Response } from "express";
import globales from "./../utils/globales";
import { novedadinterface } from "./../interfaces/novedadInterface";
import { Seguridad } from "../utils/seguridad";
/** 
 * @const Novedad
 * @desc Import del modelo Novedad de la base de datos.
 */
const novedad = require("./../../models").Novedads;

/**
 * @classdesc Clase controladora de novedades.
 * @desc Fecha Creación: 11/04/2020
 * @class
 * @public
 * @version 1.0.0
 * @returns {novedadController} novedadController
 * @author Jonathan Quintana <jiquinta@espol.edu.ec>
 */
class novedadController {
    /**
     * @async
     * @method
     * @public
     * @version 1.0.0
     * @author Danny Rios <dprios@espol.edu.ec>
     * @returns {JSON} JSON con los datos obtenidos de la consulta.
     * @desc Este método se encarga de buscar las novedades de acuerdo al usuario <br> FechaCreacion: 25/06/2020
     * @param {Request} req Objeto Request
     * @param {Response} res Objeto response
     * @type {Promise<void>} Promesa de tipo void.
     */
    public async getNovedadesUser(req: Request, res: Response): Promise<void> {     
        let dataId = res.locals; 
        let id : number = dataId.post;
  
        novedad.findAll(
            {
                
                attributes: ['idnovedad', 'idusuarioReportado', 'descripcion', 'createdAt'],
                where: {
                    idusuarioReporta: id
                },
            }
        ).then((data: any) => {
            res.status(200).json(data);
            return;
        }, (err: any) => {
            res.status(500).json({ log: "Error!! No hay datos en la base" });
            console.log(err);
            return;
        });

    }
    /**
     * @async
     * @method
     * @public
     * @version 1.0.0
     * @author Danny Rios <dprios@espol.edu.ec>
     * @returns {JSON} JSON con los datos obtenidos de la consulta.
     * @desc Este método se encarga de buscar las novedades  <br> FechaCreacion: 25/06/2020
     * @param {Request} req Objeto Request
     * @param {Response} res Objeto response
     * @type {Promise<void>} Promesa de tipo void.
     */
    public async getNovedades(req: Request, res: Response): Promise<void> {     

        novedad.findAll(
            {
                
                attributes: ['idnovedad','idusuarioReporta', 'idusuarioReportado', 'descripcion', 'createdAt','updatedAt'],
            }
        ).then((data: any) => {
            res.status(200).json(data);
            return;
        }, (err: any) => {
            res.status(500).json({ log: "Error!! No hay datos en la base" });
            console.log(err);
            return;
        });

    }
    /**
     * @async
     * @method
     * @public
     * @version 1.0.0
     * @author Jonathan Quintana <jiquinta@espol.edu.ec>
     * @returns {JSON} JSON con los datos obtenidos de la consulta.
     * @desc Este método se encarga de buscar la novedad en base al ID proporcionado en la url. <br> Fecha Creación: 11/04/2020
     * @param {Request} req Objeto Request
     * @param {Response} res Objeto response
     * @type {Promise<void>} Promesa de tipo void.
     */
    public async findById(req: Request, res: Response): Promise<void> {
        let id: any = req.params.id;
        if (isNaN(id)) {
            res.status(500).json({ log: "El ID introducido no es valido." });
            return;
        }
        id = Number(id);
        if (Number.isInteger(id) == false) {
            res.status(500).json({ log: "El ID introducido no es valido, debe ser un entero." });
            return;
        }
        novedad.findOne(
            {
                where: {
                    idnovedad: id
                },
                attributes: ['idnovedad', 'idUsuarioreporta', 'idUsuarioreportado', 'descripcion']
            }
        ).then((data: any) => {
            if (data == null) {
                res.status(404).json({ log: "No Existen datos a mostrar para el ID." })
                return;
            }
            res.status(200).json(data);
            return;
        }, (err: any) => {
            console.log(err);
            res.status(500).json({ log: "Error" });
            return;
        }
        );
    }

    /**
    * @async
    * @method
    * @public
    * @version 1.0.0
    * @author Jonathan Quintana <jiquinta@espol.edu.ec>
    * @returns {JSON} JSON con los datos obtenidos de la consulta.
    * @desc Este método se encarga de buscar la novedad en base al usuario que fue reportado proporcionado en la url. <br> Fecha Creación: 11/04/2020
    * @param {Request} req Objeto Request
    * @param {Response} res Objeto response
    * @type {Promise<void>} Promesa de tipo void.
    */
    public async findByReportado(req: Request, res: Response): Promise<void> {
        let { reportado } = req.params;
        novedad.findAll(
            {
                where: {
                    idUsuarioreportado: reportado
                },
                attributes: ['idnovedad', 'idUsuarioreporta', 'idUsuarioreportado', 'descripcion']
            }
        ).then((data: any) => {
            if (data.length == 0) {
                res.status(404).json({ log: "No Existen datos a mostrar para el ID." })
                return;
            }
            res.status(200).json(data);
            return;
        }, (err: any) => {
            console.log(err);
            res.status(500).json({ log: "Error" });
            return;
        }

        );
    }

    /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @author Jonathan Quintana <jiquinta@espol.edu.ec>
   * @returns {JSON} JSON con los datos obtenidos de la consulta.
   * @desc  Este método se encarga de buscar las novedades en base al usuario que reporta proporcionado en la url. <br> Fecha Creación: 11/04/2020
   * @param {Request} req Objeto Request
   * @param {Response} res Objeto response
   * @type {Promise<void>} Promesa de tipo void.
   */
    public async findByReporta(req: Request, res: Response): Promise<void> {
        let { reporta } = req.params;
        novedad.findAll(
            {
                where: {
                    idUsuarioreporta: reporta
                },
                attributes: ['idnovedad', 'idUsuarioreporta', 'idUsuarioreportado', 'descripcion']
            }
        ).then((data: any) => {
            if (data.length == 0) {
                res.status(404).json({ log: "No Existen datos a mostrar para el ID." })
                return;
            }
            res.status(200).json(data);
            return;
        }, (err: any) => {
            console.log(err);
            res.status(500).json({ log: "Error" });
            return;
        }

        );
    }

    /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @author Jonathan Quintana <jiquinta@espol.edu.ec>
   * @returns {JSON} JSON con los datos obtenidos de la consulta.
   * @desc  Este método se encarga de buscar todas las novedades. <br> Fecha Creación: 11/04/2020
   * @param {Request} req Objeto Request
   * @param {Response} res Objeto response
   * @type {Promise<void>} Promesa de tipo void.
   */
    public async findAll(req: Request, res: Response): Promise<void> {
        novedad.findAll(
            {
                attributes: ['idnovedad', 'idUsuarioreporta', 'idUsuarioreportado', 'descripcion']
            }
        ).then((data: any) => {
            if (data == null) {
                res.status(404).json({ log: "No Existen datos a mostrar." })
                return;
            }
            res.status(200).json(data);
            return;
        }, (err: any) => {
            console.log(err);
            res.status(500).json({ log: "Error" });
            return;
        }
        );
    }

    /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @author Jonathan Quintana <jiquinta@espol.edu.ec>
   * @returns {JSON} JSON con la respuesta de la transacción.
   * @desc  Este método se encarga de agregar la novedad proporcionada por el usuario posterior a verificar los datos
    y su integridad. <br> Fecha Creación: 11/04/2020
   * @param {Request} req Objeto Request
   * @param {Response} res Objeto response
   * @type {Promise<void>} Promesa de tipo void.
   */
    public async addNovedad(req: Request, res: Response): Promise<void> {
        let {hash} = req.body;
        //aqui desencriptar los datos
        let data: novedadinterface = {
            descripcion: req.body.descripcion,
            idusuarioReporta: req.body.idusuarioReporta,
            idusuarioReportado: req.body.idusuarioReportado
        }
        let hashInterno = Seguridad.hashJSON(data);
        if(hashInterno != hash){
            res.status(401).json({log: "Violación de integridad de datos, hash invalido."});
            return;
        }
        novedad.create(data).then((resp: any) => {
            if (resp._options.isNewRecord) {
                res.status(202).json(
                    {
                        log: "Ingresado",
                        uri: globales.globales.urlBaseNovedad + resp.dataValues.idnovedad
                    }
                );
                return;
            }
            res.status(200).json({ log: "No se ingresaron los datos." });
            return;
        }, (err: any) => {
            res.status(500).json({ log: "Error" });
            console.log(err);
            return;
        }
        );
    }

    /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @author Jonathan Quintana <jiquinta@espol.edu.ec>
   * @returns {JSON} JSON con la respuesta de la transacción.
   * @desc  Este método se encarga de modificar la novedad proporcionada por el usuario, solo se actualiza la descripción. <br> Fecha Creación: 11/04/2020
   * @param {Request} req Objeto Request
   * @param {Response} res Objeto response
   * @type {Promise<void>} Promesa de tipo void.
   */
    public async updateNovedad(req: Request, res: Response): Promise<void> {
        let id: any = req.params.id;
        if (isNaN(id)) {
            res.status(500).json({ log: "El ID introducido no es valido." });
            return;
        }
        id = Number(id);
        if (Number.isInteger(id) == false) {
            res.status(500).json({ log: "El ID introducido no es valido, debe ser un entero." });
            return;
        }
        let { descripcion } = req.body;
        let { reportado, reporta } = req.params;
        let data: novedadinterface = {
            descripcion: descripcion,
            idusuarioReporta: reporta,
            idusuarioReportado: reportado,
            updatedAt: new Date()
        }
        novedad.update(data,
            {
                where:
                {
                    idnovedad: id
                }
            }
        ).then((rs: any) => {
            if (rs[0] == 1) {
                res.status(200).json({ log: "Novedad actualizada." })
                return;
            }
            res.status(202).json({ log: "No se pudo actualizar." });
            return;
        }, (err: any) => {
            console.error(err);
            res.status(500).json({ log: "Error" });
            return;

        });
    }

}

export default new novedadController();