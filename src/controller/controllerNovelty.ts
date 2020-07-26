import { Request, Response } from "express";
import global from "../utils/global";
import { NoveltyInterface } from "../interfaces/noveltyInterface";
import { Security } from "../utils/security";
/** 
 * @const Novedad
 * @desc Import of the model New from the database.
 */
const novelty = require("./../../models").Novedads;

/**
 * @classdesc Novelty controlling class.
 * @desc Creation Date: 04/11/2020
 * @class
 * @public
 * @version 1.0.0
 * @returns {alertController} noveltyController
 * @author Jonathan Quintana <jiquinta@espol.edu.ec>
 */
class alertController {
    /**
     * @async
     * @method
     * @public
     * @version 1.0.0
     * @author Danny Rios <dprios@espol.edu.ec>
     * @returns {JSON} JSON with the data obtained from the query.
     * @desc This method is responsible for searching for news according to the user <br> CreationDate: 06/25/2020
     * @param {Request} req Object Request
     * @param {Response} res Object Response
     * @type {Promise<void>} Void type promise.
     */
    public async getAlertsUser(req: Request, res: Response): Promise<void> {
        let dataId = res.locals;
        let id: number = dataId.post;

        novelty.findAll(
            {

                attributes: ['idnovedad', 'idusuarioReportado', 'descripcion', 'createdAt'],
                where: {
                    idusuarioReporta: id
                },
            }
        ).then((data: any) => {
            if (data == null) {
                res
                  .status(404)
                  .json({ log: "No existen novedades del usuario" });
                return;
            }
            res.status(200).json(data);
            return;
        }, (err: any) => {
            res.status(500).json({ log: "Error" });
            
            return;
        });

    }
    /**
     * @async
     * @method
     * @public
     * @version 1.0.0
     * @author Danny Rios <dprios@espol.edu.ec>
     * @returns {JSON} JSON with the data obtained from the query.
     * @desc This method is in charge of searching for news <br> Creation Date: 06/25/2020
     * @param {Request} req Object Request
     * @param {Response} res Object Response
     * @type {Promise<void>} Void type promise.
     */
    public async getAlerts(req: Request, res: Response): Promise<void> {

        novelty.findAll(
            {

                attributes: ['idnovedad', 'idusuarioReporta', 'idusuarioReportado', 'descripcion', 'createdAt', 'updatedAt'],
            }
        ).then((data: any) => {
            if (data == null) {
                res
                  .status(404)
                  .json({ log: "No hay novedades" });
                return;
            }
            res.status(200).json(data);
            return;
        }, (err: any) => {
            res.status(500).json({ log: "Error" });
            
            return;
        });

    }
    /**
     * @async
     * @method
     * @public
     * @version 1.0.0
     * @author Jonathan Quintana <jiquinta@espol.edu.ec>
     * @returns {JSON} JSON with the data obtained from the query.
     * @desc This method is in charge of searching for the novelty based on the ID provided in the url. <br> Creation Date: 04/11/2020
     * @param {Request} req Object Request
     * @param {Response} res Object Response
     * @type {Promise<void>} Void type promise.
     */
    public async findById(req: Request, res: Response): Promise<void> {
        let id: any = req.params.id;
        if (isNaN(id)) {
            res.status(400).json({ log: "El ID introducido no es valido." });
            return;
        }
        id = Number(id);
        if (Number.isInteger(id) == false) {
            res.status(400).json({ log: "El ID introducido no es valido, debe ser un entero." });
            return;
        }
        novelty.findOne(
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
    * @returns {JSON} JSON with the data obtained from the query.
    * @desc This method is in charge of searching the news based on the user that was reported provided in the url. <br> Creation Date: 04/11/2020
    * @param {Request} req Object Request
    * @param {Response} res Object Response
    * @type {Promise<void>} Void type promise.
    */
    public async findByReported(req: Request, res: Response): Promise<void> {
        let { reportado } = req.params;
        novelty.findAll(
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
   * @returns {JSON} JSON with the data obtained from the query.
   * @desc  This method is in charge of looking for news based on the user who reports provided in the url. <br> Creation Date: 04/11/2020
   * @param {Request} req Object Request
   * @param {Response} res Object Response
   * @type {Promise<void>} Void type promise.
   */
    public async findByReports(req: Request, res: Response): Promise<void> {
        let { reporta } = req.params;
        novelty.findAll(
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
   * @returns {JSON} JSON with the data obtained from the query.
   * @desc  This method is responsible for finding all the news. <br> Creation Date: 04/11/2020
   * @param {Request} req Object Request
   * @param {Response} res Object Response
   * @type {Promise<void>} Void type promise.
   */
    public async findAll(req: Request, res: Response): Promise<void> {
        novelty.findAll(
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
   * @returns {JSON} JThey are with the response of the transaction.
   * @desc  This method is responsible for adding the novelty provided by the user after verifying the data
     and its integrity. <br> Creation Date: 04/11/2020
   * @param {Request} req Object Request
   * @param {Response} res Object Response
   * @type {Promise<void>} Void type promise.
   */
    public async addAlerts(req: Request, res: Response): Promise<void> {
        let { hash } = req.body;
        //aqui desencriptar los datos
        let data: NoveltyInterface = {
            descripcion: req.body.descripcion,
            idusuarioReporta: req.body.idusuarioReporta,
            idusuarioReportado: req.body.idusuarioReportado
        }
        let hashInterno = Security.hashJSON(data);
        if (hashInterno != hash) {
            res.status(401).json({ log: "Violación de integridad de datos, hash invalido." });
            return;
        }
        novelty.create(data).then((resp: any) => {
            if (resp._options.isNewRecord) {
                res.status(202).json(
                    {
                        log: "Ingresado",
                        uri: global.globals.urlNoveltyBase + resp.dataValues.idnovedad
                    }
                );
                return;
            }
            res.status(404).json({ log: "No se pudo crear la novedad." });
            return;
        }, (err: any) => {
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
   * @returns {JSON} JSON with the transaction response.
   * @desc This method is responsible for modifying the novelty provided by the user, only the description is updated. <br> Creation Date: 04/11/2020
   * @param {Request} req Object Request
   * @param {Response} res Object Response
   * @type {Promise<void>} Void type promise.
   */
    public async updateAlerts(req: Request, res: Response): Promise<void> {
        let id: any = req.params.id;
        if (isNaN(id)) {
            res.status(400).json({ log: "El ID introducido no es valido." });
            return;
        }
        id = Number(id);
        if (Number.isInteger(id) == false) {
            res.status(400).json({ log: "El ID introducido no es valido, debe ser un entero." });
            return;
        }
        let { descripcion } = req.body;
        let { reportado, reporta } = req.params;
        let data: NoveltyInterface = {
            descripcion: descripcion,
            idusuarioReporta: reporta,
            idusuarioReportado: reportado,
            updatedAt: new Date()
        }
        novelty.update(data,
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
            res.status(404).json({ log: "No se encontro la novedad." });
            return;
        }, (err: any) => {
            res.status(500).json({ log: "Error" });
            return;

        });
    }

}

export default new alertController();