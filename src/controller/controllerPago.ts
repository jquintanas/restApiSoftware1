import { Request, Response } from "express";
const pagos = require('./../../models').Pagos;
const formasPagos = require('./../../models').formasPagos;
import { pagosInterface } from "./../interfaces/pagosInterface";
import globales from "./../utils/globales";
import { Security } from "./../utils/seguridad";

 /**
 * @classdesc Clase controladora de pagos.
 * @desc Fecha Creación: 11/04/2020
 * @class
 * @public
 * @version 1.0.0
 * @returns {pagosController} pagosController
 * @author Jonathan Quintana <jiquinta@espol.edu.ec>
 */
class pagosController {
    /**
     * @async
     * @method
     * @public
     * @version 1.0.0
     * @author Jonathan Quintana <jiquinta@espol.edu.ec>
     * @returns {JSON} JSON con los datos obtenidos de la consulta.
     * @desc Este método se encarga de buscar el pago en base al ID proporcionado en la url. <br> Fecha Creación: 11/04/2020
     * @param {Request} req Objeto Request
     * @param {Response} res Objeto response
     * @type {Promise<void>} Promesa de tipo void.
     */
    public async findByID(req: Request, res: Response): Promise<void> {
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
        pagos.findOne(
            {
                where: {
                    idpago: id
                },
                attributes: ['idPago', 'idformaPago', 'total', 'imagen'],
                include: [
                    {
                        model: formasPagos,
                        required: true,
                        attributes: ['id', 'nombre', 'descripcion']
                    }
                ]
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
            res.status(500).json({log: "Error"});
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
   * @desc   Este método se encarga de agregar los datos del pago realizado por el usuario, se debe validar la integridad
    de los mismos, cuando se ingresa exitosamente los datos se retorna el mensaje pertinente y la uri del recurso. <br> Fecha Creación: 11/04/2020
   * @param {Request} req Objeto Request
   * @param {Response} res Objeto response
   * @type {Promise<void>} Promesa de tipo void.
   */
    public async addPago(req: Request, res: Response): Promise<void> {
        let {hash} = req.body;
        let data: pagosInterface = {
            idformaPago: req.body.idformaPago,
            imagen: req.body.imagen,
            total: req.body.total
        }
        let hashInterno = Security.hashJSON(data);
        //aqui se debe desencriptar el hash
        data.createdAt = new Date();
        if(hashInterno != hash){
            res.status(401).json({log: "Violación de integridad de datos, hash invalido."});
            return;
        }
        pagos.create(data).then((resp: any) => {
            if (resp._options.isNewRecord) {
                res.status(202).json(
                    {
                        log: "Ingresado",
                        uri: globales.globals.urlBasePagos + resp.dataValues.idPago
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
        });
    }

   /**
   * @async
   * @method
   * @public
   * @version 1.0.0
   * @author Jonathan Quintana <jiquinta@espol.edu.ec>
   * @returns {JSON} JSON con la respuesta de la transacción.
   * @desc   Este método se encarga de eliminar una forma de pago en base al ID que se proporciona por la url. <br> Fecha Creación: 11/04/2020
   * @param {Request} req Objeto Request
   * @param {Response} res Objeto response
   * @type {Promise<void>} Promesa de tipo void.
   */
    public async deletePago(req: Request, res: Response): Promise<void> {
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
        pagos.destroy({ where: { idPago: id } }).then((data: any) => {
            if (data == 1) {
                res.status(200).json({ log: "Eliminado" });
                return;
            }
            else {
                res.status(200).json({ log: "Sin datos a eliminar." });
                return;
            }
        }, (err: any) => {
            res.status(500).json({ log: "Error" });
            console.log(err);
            return;
        })
    }
}

export default new pagosController();